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

export function getPromotionCampaignBySlug(slug) {
    return promotionCampaigns.find((campaign) => campaign.slug === slug) || null;
}

export function getActivePromotionCampaign(date = new Date()) {
    const currentMonth = getCurrentMonthIndex(date);
    return promotionCampaigns.find((campaign) => campaign.monthIndex === currentMonth) || null;
}

export function getActiveOrUpcomingPromotionCampaign(date = new Date()) {
    const activeCampaign = getActivePromotionCampaign(date);
    if (activeCampaign) return activeCampaign;

    const currentMonth = getCurrentMonthIndex(date);
    const upcomingCampaign = promotionCampaigns.find((campaign) => campaign.monthIndex > currentMonth);

    return upcomingCampaign || promotionCampaigns[0] || null;
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
