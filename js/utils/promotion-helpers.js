import { products } from '../data/products.js';
import { promotionCampaigns } from '../data/promotions-data.js';

export function normalizeProductKey(value = '') {
    return value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function getCurrentMonthIndex(date = new Date()) {
    return date.getMonth();
}

export function normalizeDateInput(value) {
    const date = value instanceof Date ? new Date(value) : new Date(`${value}T00:00:00`);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function isDateWithinPromotion(date, campaign) {
    if (!campaign?.startDate || !campaign?.endDate) return false;

    const targetDate = normalizeDateInput(date);
    const startDate = normalizeDateInput(campaign.startDate);
    const endDate = normalizeDateInput(campaign.endDate);

    return targetDate >= startDate && targetDate <= endDate;
}

export function sortCampaignsByStartDate(campaigns = promotionCampaigns) {
    return [...campaigns].sort((campaignA, campaignB) => (
        normalizeDateInput(campaignA.startDate) - normalizeDateInput(campaignB.startDate)
    ));
}

export function getPromotionCampaignBySlug(slug) {
    return promotionCampaigns.find((campaign) => campaign.slug === slug) || null;
}

export function getActivePromotionCampaign(date = new Date()) {
    return sortCampaignsByStartDate().find((campaign) => isDateWithinPromotion(date, campaign)) || null;
}

export function getUpcomingPromotionCampaign(date = new Date()) {
    const targetDate = normalizeDateInput(date);

    return sortCampaignsByStartDate().find((campaign) => normalizeDateInput(campaign.startDate) > targetDate) || null;
}

export function getActiveOrUpcomingPromotionCampaign(date = new Date()) {
    const activeCampaign = getActivePromotionCampaign(date);
    if (activeCampaign) return activeCampaign;

    return getUpcomingPromotionCampaign(date) || sortCampaignsByStartDate()[0] || null;
}

export function buildPromotionProducts(campaign) {
    if (!campaign) return [];

    return campaign.products
        .map((promotionProduct) => {
            const product = products.find((item) => item.id === promotionProduct.productId);
            if (!product) return null;

            return {
                ...product,
                ...promotionProduct,
                campaign,
                isPromotionActive: true
            };
        })
        .filter(Boolean);
}

export function buildActivePromotionProductMap(date = new Date()) {
    const activeCampaign = getActivePromotionCampaign(date);
    const activeProducts = buildPromotionProducts(activeCampaign);

    return activeProducts.reduce((map, product) => {
        map.set(product.id, product);
        map.set(normalizeProductKey(product.id), product);
        map.set(normalizeProductKey(product.name), product);
        return map;
    }, new Map());
}
