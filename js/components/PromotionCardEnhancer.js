import { safeQuerySelectorAll } from '../utils/helpers.js';
import { buildActivePromotionProductMap, getActivePromotionCampaign, normalizeProductKey } from '../utils/promotion-helpers.js';
import { products } from '../data/products.js';

class PromotionCardEnhancer {
    constructor() {
        this.activeCampaign = getActivePromotionCampaign();
        this.activePromotionMap = buildActivePromotionProductMap();
        this.productMap = this.buildProductMap();

        this.init();
    }

    init() {
        this.enhanceCards();
    }

    refresh() {
        this.activeCampaign = getActivePromotionCampaign();
        this.activePromotionMap = buildActivePromotionProductMap();
        this.enhanceCards();
    }

    buildProductMap() {
        return products.reduce((map, product) => {
            map.set(normalizeProductKey(product.id), product);
            map.set(normalizeProductKey(product.name), product);
            return map;
        }, new Map());
    }

    getCardTitle(card) {
        const title = card.querySelector('h3');
        return title ? title.textContent.trim() : '';
    }

    getCardKey(card) {
        const productId = normalizeProductKey(card.dataset.productId);
        if (productId) return productId;

        return normalizeProductKey(this.getCardTitle(card));
    }

    getPromotionProduct(card) {
        const productKey = this.getCardKey(card);
        if (!productKey) return null;

        return this.activePromotionMap.get(productKey) || null;
    }

    getBaseProduct(card) {
        const productKey = this.getCardKey(card);
        if (!productKey) return null;

        return this.productMap.get(productKey) || null;
    }

    shouldSkipCard(card) {
        return (
            card.classList.contains('product-card--promo-home') ||
            card.classList.contains('product-card--promo-detail') ||
            card.dataset.promoEnhanced === 'true'
        );
    }

    ensureDiscountTag(card, promotionProduct) {
        const media = card.querySelector('.card-image-container');
        if (!media || media.querySelector('.discount-tag')) return;

        media.insertAdjacentHTML('afterbegin', `<div class="discount-tag">${promotionProduct.discountLabel}</div>`);
    }

    ensureCampaignLink(card, promotionProduct) {
        const media = card.querySelector('.card-image-container');
        if (!media || media.querySelector('.favorite-btn')) return;

        media.insertAdjacentHTML(
            'beforeend',
            `
                <a
                    class="favorite-btn"
                    href="promocion-detalle.html?promo=${promotionProduct.campaign.slug}"
                    aria-label="Ver campaña ${promotionProduct.campaign.title}"
                    title="Ver campaña ${promotionProduct.campaign.title}"
                >
                    <i class="fas fa-arrow-up-right-from-square"></i>
                </a>
            `
        );
    }

    ensureCampaignLabel(card, promotionProduct) {
        const content = card.querySelector('.card-content');
        const title = content ? content.querySelector('h3') : null;

        if (!content || !title || content.querySelector('.promo-card__campaign-label')) return;

        title.insertAdjacentHTML('beforebegin', `<span class="promo-card__campaign-label">${promotionProduct.campaign.title}</span>`);
    }

    syncCardWithBaseProduct(card, baseProduct) {
        if (!baseProduct) return;

        const image = card.querySelector('.card-image-container img');
        const description = card.querySelector('.card-content p');
        const price = card.querySelector('.price');
        const title = card.querySelector('.card-content h3');

        if (image) {
            image.src = baseProduct.image;
            image.alt = baseProduct.name;
        }

        if (title) {
            title.textContent = baseProduct.name;
        }

        if (description) {
            description.textContent = baseProduct.description;
        }

        if (price && !card.classList.contains('product-card--promo-live')) {
            price.innerHTML = `<span class="current-price">S/ ${parseFloat(baseProduct.price).toFixed(2)}</span>`;
        }
    }

    updatePriceBlock(card, promotionProduct) {
        const price = card.querySelector('.price');
        if (!price) return;

        price.classList.add('price--promo-live');
        price.innerHTML = `
            <span class="current-price">S/ ${parseFloat(promotionProduct.promoPrice).toFixed(2)}</span>
            <span class="old-price">S/ ${parseFloat(promotionProduct.originalPrice).toFixed(2)}</span>
        `;
    }

    enhanceCard(card, promotionProduct) {
        card.classList.add('product-card--promo', 'product-card--promo-live');
        card.dataset.promoEnhanced = 'true';
        card.dataset.promoSlug = promotionProduct.campaign.slug;

        this.ensureDiscountTag(card, promotionProduct);
        this.ensureCampaignLink(card, promotionProduct);
        this.ensureCampaignLabel(card, promotionProduct);
        this.updatePriceBlock(card, promotionProduct);
    }

    enhanceCards() {
        const productCards = safeQuerySelectorAll('.product-card');

        productCards.forEach((card) => {
            const baseProduct = this.getBaseProduct(card);

            if (!this.shouldSkipCard(card)) {
                this.syncCardWithBaseProduct(card, baseProduct);
            }

            if (this.shouldSkipCard(card)) return;

            const promotionProduct = this.getPromotionProduct(card);
            if (!promotionProduct) return;

            this.enhanceCard(card, promotionProduct);
        });
    }
}

export const promotionCardEnhancer = new PromotionCardEnhancer();
export { PromotionCardEnhancer };
