import { formatPrice, safeQuerySelector } from '../utils/helpers.js';
import { buildPromotionProducts, getPromotionCampaignBySlug } from '../utils/promotion-helpers.js';
import { productManager } from './ProductManager.js';
import { productDetailModal } from './ProductDetailModal.js';
import { BREAKPOINTS } from '../breakpoints.js';

class PromotionDetailManager {
    constructor() {
        this.hero = safeQuerySelector('#promotionDetailHero');
        this.title = safeQuerySelector('#promotionDetailTitle');
        this.subtitle = safeQuerySelector('#promotionDetailSubtitle');
        this.description = safeQuerySelector('#promotionDetailDescription');
        this.benefit = safeQuerySelector('#promotionDetailBenefit');
        this.support = safeQuerySelector('#promotionDetailSupport');
        this.grid = safeQuerySelector('#promotionDetailProducts');
        this.terms = safeQuerySelector('#promotionDetailTerms');
        this.emptyState = safeQuerySelector('#promotionDetailEmpty');
        this.mobileMediaQuery = window.matchMedia(`(width < ${BREAKPOINTS.md}px)`);
        this.currentCampaign = null;
        this.handleViewportChange = () => {
            if (this.currentCampaign) {
                this.applyHeroBackground(this.currentCampaign);
            }
        };

        this.init();
    }

    init() {
        if (!document.body.classList.contains('promotion-detail-page')) return;

        this.render();
    }

    getRequestedSlug() {
        const params = new URLSearchParams(window.location.search);
        return params.get('promo');
    }

    getCampaign(slug) {
        return getPromotionCampaignBySlug(slug);
    }

    buildCampaignProducts(campaign) {
        return buildPromotionProducts(campaign);
    }

    getHeroBannerImage(campaign) {
        if (this.mobileMediaQuery.matches && campaign.mobileBannerImage) {
            return campaign.mobileBannerImage;
        }

        return campaign.bannerImage;
    }

    applyHeroBackground(campaign) {
        if (!this.hero) return;

        this.hero.style.backgroundImage = `linear-gradient(180deg, rgba(7, 17, 38, 0.18), rgba(7, 17, 38, 0.62)), url('${this.getHeroBannerImage(campaign)}')`;
        this.hero.style.backgroundPosition = campaign.bannerPosition || 'center center';
    }

    renderCampaignHeader(campaign) {
        if (!this.hero || !this.title || !this.subtitle || !this.description || !this.benefit || !this.support) return;

        this.applyHeroBackground(campaign);
        this.title.textContent = campaign.title;
        this.subtitle.textContent = campaign.subtitle;
        this.description.textContent = campaign.description;
        this.benefit.textContent = campaign.benefitLabel;
        this.support.textContent = campaign.supportText;
    }

    renderProducts(campaignProducts) {
        if (!this.grid) return;

        this.grid.innerHTML = campaignProducts
            .map((product) => `
                <article class="product-card product-card--catalog-vertical product-card--promo product-card--promo-detail">
                    <div class="card-image-container">
                        <div class="discount-tag">${product.discountLabel}</div>
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price price--promo-detail">
                            <span class="current-price">${formatPrice(product.promoPrice)}</span>
                            <span class="old-price">${formatPrice(product.originalPrice)}</span>
                        </div>
                        <button class="add-to-cart-btn add-to-cart-btn--icon" data-button-variant="icon" aria-label="Agregar ${product.name} al pedido">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </article>
            `)
            .join('');
    }

    renderTerms(campaign) {
        if (!this.terms) return;

        this.terms.innerHTML = campaign.terms
            .map((term) => `<li>${term}</li>`)
            .join('');
    }

    renderEmptyState() {
        if (this.emptyState) {
            this.emptyState.hidden = false;
        }

        if (this.hero) {
            this.hero.style.backgroundImage = "linear-gradient(180deg, rgba(7, 17, 38, 0.22), rgba(7, 17, 38, 0.72)), url('img/bannerhora.png')";
            this.hero.style.backgroundPosition = 'center 38%';
        }

        if (this.title) this.title.textContent = 'Promoción no disponible';
        if (this.subtitle) this.subtitle.textContent = 'Campaña no encontrada';
        if (this.description) this.description.textContent = 'No encontramos una campaña asociada a este enlace. Vuelve a promociones y elige una campaña vigente.';
        if (this.benefit) this.benefit.textContent = 'Explora nuestras promociones exclusivas';
        if (this.support) this.support.textContent = 'Puedes regresar al calendario y revisar la campaña activa del momento.';
    }

    render() {
        const requestedSlug = this.getRequestedSlug();
        const campaign = this.getCampaign(requestedSlug);

        if (!campaign) {
            this.renderEmptyState();
            return;
        }

        const campaignProducts = this.buildCampaignProducts(campaign);
        this.currentCampaign = campaign;

        this.renderCampaignHeader(campaign);
        this.renderProducts(campaignProducts);
        this.renderTerms(campaign);
        productManager.setupAddToCartButtons();
        productDetailModal.setupProductCardListeners();
        this.mobileMediaQuery.addEventListener('change', this.handleViewportChange);

        if (this.emptyState) {
            this.emptyState.hidden = true;
        }
    }
}

export const promotionDetailManager = new PromotionDetailManager();
export { PromotionDetailManager };
