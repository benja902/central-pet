import { formatPrice, safeQuerySelector } from '../utils/helpers.js';
import { buildPromotionProducts, getActivePromotionCampaign } from '../utils/promotion-helpers.js';
import { productManager } from './ProductManager.js';
import { productDetailModal } from './ProductDetailModal.js';

class HomePromotionsManager {
    constructor() {
        this.section = safeQuerySelector('#promociones-section');
        this.track = safeQuerySelector('#home-promotions-track');
        this.intro = safeQuerySelector('#home-promotions-intro');
        this.productsPerCampaign = 6;

        this.init();
    }

    init() {
        if (!this.section || !this.track) return;

        this.render();
    }

    getActiveCampaign() {
        return getActivePromotionCampaign();
    }

    buildCampaignProducts(campaign) {
        return buildPromotionProducts(campaign)
            .filter(Boolean)
            .slice(0, this.productsPerCampaign);
    }

    renderHeader(campaign, slides) {
        if (!this.intro) return;

        this.intro.textContent = '';
        this.intro.hidden = true;
    }

    renderProductSlides(productSlides) {
        return productSlides
            .map((product) => `
                <div class="swiper-slide">
                    <article class="product-card product-card--catalog-vertical product-card--promo product-card--promo-home product-card--promo-detail">
                        <div class="card-image-container">
                            <div class="discount-tag">${product.discountLabel}</div>
                            <a
                                class="favorite-btn"
                                href="promocion-detalle.html?promo=${product.campaign.slug}"
                                aria-label="Ver campaña ${product.campaign.title}"
                                title="Ver campaña ${product.campaign.title}"
                            >
                                <i class="fas fa-arrow-up-right-from-square"></i>
                            </a>
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="card-content">
                            <span class="promo-card__campaign-label">${product.campaign.title}</span>
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price price--promo-home price--promo-detail">
                                <span class="current-price">${formatPrice(product.promoPrice)}</span>
                                <span class="old-price">${formatPrice(product.originalPrice)}</span>
                            </div>
                            <button class="add-to-cart-btn add-to-cart-btn--icon" data-button-variant="icon" aria-label="Agregar ${product.name} al pedido">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </article>
                </div>
            `)
            .join('');
    }

    render() {
        const activeCampaign = this.getActiveCampaign();
        if (!activeCampaign) return;

        const productSlides = this.buildCampaignProducts(activeCampaign);
        if (!productSlides.length) return;

        this.renderHeader(activeCampaign, productSlides);
        this.track.innerHTML = this.renderProductSlides(productSlides);

        productManager.setupAddToCartButtons();
        productDetailModal.setupProductCardListeners();
    }
}

export const homePromotionsManager = new HomePromotionsManager();
export { HomePromotionsManager };
