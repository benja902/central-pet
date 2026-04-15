import { formatPrice, safeQuerySelector } from '../utils/helpers.js';
import { products, recommendedProductIds } from '../data/products.js';
import { buildPromotionProducts, getActivePromotionCampaign } from '../utils/promotion-helpers.js';
import { productManager } from './ProductManager.js';
import { productDetailModal } from './ProductDetailModal.js';

class RecommendedManager {
    constructor() {
        this.section = safeQuerySelector('#recomendados-section');
        this.track = safeQuerySelector('#home-recommended-track');
        this.limit = 6;
        this.promotedLimit = 2;

        this.init();
    }

    init() {
        if (!this.section || !this.track) return;

        this.render();
    }

    getRecommendedProducts() {
        const productMap = products.reduce((map, product) => {
            map.set(product.id, product);
            return map;
        }, new Map());

        const campaign = getActivePromotionCampaign();
        const promotionProductMap = buildPromotionProducts(campaign).reduce((map, product) => {
            map.set(product.id, product);
            return map;
        }, new Map());

        const promotedRecommendations = recommendedProductIds
            .map((productId) => promotionProductMap.get(productId))
            .filter(Boolean)
            .slice(0, this.promotedLimit);

        const promotedIds = new Set(promotedRecommendations.map((product) => product.id));

        const regularRecommendations = recommendedProductIds
            .map((productId) => productMap.get(productId))
            .filter(Boolean)
            .filter((product) => !promotedIds.has(product.id));

        return [
            ...promotedRecommendations,
            ...regularRecommendations
        ].slice(0, this.limit);
    }

    renderPrice(product) {
        if (product.promoPrice && product.originalPrice) {
            return `
                <div class="price price--promo-home price--promo-detail">
                    <span class="current-price">${formatPrice(product.promoPrice)}</span>
                    <span class="old-price">${formatPrice(product.originalPrice)}</span>
                </div>
            `;
        }

        return `
            <div class="price">
                <span class="current-price">${formatPrice(product.price)}</span>
            </div>
        `;
    }

    render() {
        const recommendedProducts = this.getRecommendedProducts();
        if (!recommendedProducts.length) return;

        this.track.innerHTML = recommendedProducts
            .map((product) => `
                <div class="swiper-slide">
                    <article class="product-card product-card--catalog-vertical${product.promoPrice ? ' product-card--promo product-card--promo-home product-card--promo-detail' : ''}">
                        <div class="card-image-container">
                            ${product.discountLabel ? `<div class="discount-tag">${product.discountLabel}</div>` : ''}
                            ${product.campaign ? `
                                <a
                                    class="favorite-btn"
                                    href="promocion-detalle.html?promo=${product.campaign.slug}"
                                    aria-label="Ver campaña ${product.campaign.title}"
                                    title="Ver campaña ${product.campaign.title}"
                                >
                                    <i class="fas fa-arrow-up-right-from-square"></i>
                                </a>
                            ` : ''}
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="card-content">
                            ${product.campaign ? `<span class="promo-card__campaign-label">${product.campaign.title}</span>` : ''}
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            ${this.renderPrice(product)}
                            <button class="add-to-cart-btn add-to-cart-btn--icon" data-button-variant="icon" aria-label="Agregar ${product.name} al pedido">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </article>
                </div>
            `)
            .join('');

        productManager.setupAddToCartButtons();
        productDetailModal.setupProductCardListeners();
    }
}

export const recommendedManager = new RecommendedManager();
export { RecommendedManager };
