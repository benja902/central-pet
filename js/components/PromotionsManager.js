import { safeQuerySelector } from '../utils/helpers.js';
import { promotionCalendar } from '../data/promotions-data.js';
import { BREAKPOINTS } from '../breakpoints.js';
import {
    getActivePromotionCampaign,
    getActiveOrUpcomingPromotionCampaign,
    isDateWithinPromotion,
    normalizeDateInput
} from '../utils/promotion-helpers.js';

class PromotionsManager {
    constructor() {
        this.timeline = safeQuerySelector('#promotions-timeline');
        this.summaryName = safeQuerySelector('#active-promo-name');
        this.summaryMeta = safeQuerySelector('#active-promo-meta');
        this.summaryScrollButton = safeQuerySelector('#active-promo-scroll');
        this.promotions = promotionCalendar;

        this.init();
    }

    init() {
        if (!document.body.classList.contains('promotions-page') || !this.timeline) return;

        this.render();
        this.setupSummaryInteractions();
    }

    getCurrentContext() {
        const today = new Date();
        const activeCampaign = getActivePromotionCampaign(today);
        const featuredCampaign = getActiveOrUpcomingPromotionCampaign(today);
        const activePromotion = activeCampaign
            ? this.promotions.find((promotion) => promotion.slug === activeCampaign.slug) || null
            : null;
        const featuredPromotion = featuredCampaign
            ? this.promotions.find((promotion) => promotion.slug === featuredCampaign.slug) || null
            : null;

        return {
            today,
            activePromotion,
            featuredPromotion
        };
    }

    getPromotionState(promotion, today) {
        if (isDateWithinPromotion(today, promotion)) return 'active';
        if (normalizeDateInput(promotion.endDate) < normalizeDateInput(today)) return 'past';
        return 'upcoming';
    }

    getStatusLabel(state) {
        if (state === 'active') return 'Disponible ahora';
        if (state === 'past') return 'Temporada pasada';
        return 'Próximamente';
    }

    formatRange(dateString) {
        return new Intl.DateTimeFormat('es-PE', {
            day: 'numeric',
            month: 'long'
        }).format(normalizeDateInput(dateString));
    }

    getAvailabilityCopy(state, promotion) {
        const rangeText = `${this.formatRange(promotion.startDate)} al ${this.formatRange(promotion.endDate)}`;

        if (state === 'active') {
            return `Vigente del ${rangeText} en Central Pet.`;
        }

        if (state === 'past') {
            return `Se realizó del ${rangeText} como parte de nuestro calendario promocional.`;
        }

        return `Programada del ${rangeText}.`;
    }

    updateSummary(activePromotion, featuredPromotion) {
        if (!this.summaryName || !this.summaryMeta) return;

        if (activePromotion) {
            const summaryTitle = activePromotion.eventName === activePromotion.promoTitle
                ? activePromotion.promoTitle
                : `${activePromotion.eventName} · ${activePromotion.promoTitle}`;

            this.summaryName.textContent = summaryTitle;
            this.summaryMeta.textContent = 'Esta es la promoción vigente que tenemos disponible en este momento.';
            this.updateSummaryScrollButton(true);
            return;
        }

        if (featuredPromotion) {
            this.summaryName.textContent = featuredPromotion.promoTitle;
            this.summaryMeta.textContent = `La próxima campaña real llegará del ${this.formatRange(featuredPromotion.startDate)} al ${this.formatRange(featuredPromotion.endDate)}.`;
            this.updateSummaryScrollButton(true);
            return;
        }

        this.summaryName.textContent = 'Pronto anunciaremos una nueva temporada promocional';
        this.summaryMeta.textContent = 'Explora nuestras campañas especiales y mantente atento a la próxima fecha importante del calendario.';
        this.updateSummaryScrollButton(false);
    }

    updateSummaryScrollButton(isEnabled) {
        if (!this.summaryScrollButton) return;

        this.summaryScrollButton.disabled = !isEnabled;
    }

    setupSummaryInteractions() {
        if (!this.summaryScrollButton) return;

        this.summaryScrollButton.addEventListener('click', () => {
            const featuredPromotion = this.timeline.querySelector('.promo-node.is-active, .promo-node.is-featured');

            if (!featuredPromotion) return;

            const navbar = document.querySelector('.navbar.fixed-top');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const viewportOffset = window.innerWidth < BREAKPOINTS.md ? 18 : 34;
            const targetTop = featuredPromotion.getBoundingClientRect().top + window.scrollY - navbarHeight - viewportOffset;

            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: 'smooth'
            });

            window.clearTimeout(this.highlightTimeout);
            featuredPromotion.classList.remove('is-highlighted');

            window.setTimeout(() => {
                featuredPromotion.classList.add('is-highlighted');

                this.highlightTimeout = window.setTimeout(() => {
                    featuredPromotion.classList.remove('is-highlighted');
                }, 1200);
            }, 420);
        });
    }

    render() {
        const { today, activePromotion, featuredPromotion } = this.getCurrentContext();

        this.timeline.innerHTML = this.promotions
            .map((promotion, index) => {
                const state = this.getPromotionState(promotion, today);
                const sideClass = index % 2 === 0 ? 'promo-node--left' : 'promo-node--right';
                const isInteractive = state === 'active' || (state === 'upcoming' && featuredPromotion?.slug === promotion.slug);
                const isFeatured = !activePromotion && featuredPromotion?.slug === promotion.slug;
                const badgeText = state === 'active' ? 'Activa ahora' : promotion.badge;
                const statusText = this.getStatusLabel(state);
                const availabilityText = this.getAvailabilityCopy(state, promotion);
                const summaryCtaLabel = state === 'active' ? promotion.ctaLabel : 'Ver detalle';

                return `
                    <article class="promo-node ${sideClass} is-${state}${isFeatured ? ' is-featured' : ''}" data-promo-state="${state}" data-promo-slug="${promotion.slug}">
                        <div class="promo-node__content">
                            <span class="promo-node__month">${promotion.dateLabel}</span>
                            <span class="promo-node__event">${promotion.eventName}</span>
                            <span class="promo-node__status">${statusText}</span>
                        </div>

                        <div class="promo-node__spine" aria-hidden="true"></div>

                        <div class="promo-card">
                            <div class="promo-card__media">
                                <img
                                    src="${promotion.image}"
                                    alt="${promotion.promoTitle}"
                                    style="object-position: ${promotion.imagePosition || 'center center'};"
                                >
                                <span class="promo-card__badge">${badgeText}</span>
                            </div>

                            <div class="promo-card__body">
                                <h2 class="promo-card__title">${promotion.promoTitle}</h2>
                                <p class="promo-card__description">${promotion.description}</p>

                                <div class="promo-card__footer">
                                    <div class="promo-card__prices">
                                        <span class="promo-card__price-current">${promotion.highlight}</span>
                                        <span class="promo-card__price-old promo-card__highlight-detail">${promotion.highlightDetail}</span>
                                    </div>

                                    <a
                                        class="promo-card__cta"
                                        href="${isInteractive ? promotion.campaignUrl : '#'}"
                                        ${isInteractive ? '' : 'aria-disabled="true" tabindex="-1"'}
                                    >
                                        <i class="fas fa-anchor"></i>
                                        ${isInteractive ? summaryCtaLabel : 'Próximamente'}
                                    </a>
                                </div>

                                <p class="promo-card__availability">${availabilityText}</p>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join('');

        this.updateSummary(activePromotion, featuredPromotion);
    }
}

export const promotionsManager = new PromotionsManager();
export { PromotionsManager };
