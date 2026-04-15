import { safeQuerySelector } from '../utils/helpers.js';
import { promotionCalendar } from '../data/promotions-data.js';
import { BREAKPOINTS } from '../breakpoints.js';

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
        const currentMonth = today.getMonth();
        const currentPromotion = this.promotions.find((promotion) => promotion.monthIndex === currentMonth) || null;

        return {
            today,
            currentMonth,
            currentPromotion
        };
    }

    getPromotionState(monthIndex, currentMonth) {
        if (monthIndex === currentMonth) return 'active';
        return monthIndex < currentMonth ? 'past' : 'upcoming';
    }

    getStatusLabel(state, promotion) {
        if (state === 'active') return 'Disponible ahora';
        if (state === 'past') return 'Edición de temporada';
        return 'Próximamente';
    }

    getAvailabilityCopy(state, promotion) {
        if (state === 'active') {
            return 'Disponible por tiempo limitado en Central Pet.';
        }

        if (state === 'past') {
            return 'Parte de nuestras promociones exclusivas del año.';
        }

        return `Disponible en su temporada especial de ${promotion.dateLabel}.`;
    }

    updateSummary(currentPromotion) {
        if (!this.summaryName || !this.summaryMeta) return;

        if (currentPromotion) {
            const summaryTitle = currentPromotion.eventName === currentPromotion.promoTitle
                ? currentPromotion.promoTitle
                : `${currentPromotion.eventName} · ${currentPromotion.promoTitle}`;

            this.summaryName.textContent = summaryTitle;
            this.summaryMeta.textContent = 'Esta es la experiencia especial que tenemos disponible en este momento.';
            this.updateSummaryScrollButton(true);
            return;
        }

        this.summaryName.textContent = 'Muy pronto una nueva promoción tomará esta temporada';
        this.summaryMeta.textContent = 'Explora nuestras campañas especiales y descubre las experiencias exclusivas que vuelven durante el año.';
        this.updateSummaryScrollButton(false);
    }

    updateSummaryScrollButton(isEnabled) {
        if (!this.summaryScrollButton) return;

        this.summaryScrollButton.disabled = !isEnabled;
    }

    setupSummaryInteractions() {
        if (!this.summaryScrollButton) return;

        this.summaryScrollButton.addEventListener('click', () => {
            const activePromotion = this.timeline.querySelector('.promo-node.is-active');

            if (!activePromotion) return;

            const navbar = document.querySelector('.navbar.fixed-top');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const viewportOffset = window.innerWidth < BREAKPOINTS.md ? 18 : 34;
            const targetTop = activePromotion.getBoundingClientRect().top + window.scrollY - navbarHeight - viewportOffset;

            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: 'smooth'
            });

            window.clearTimeout(this.highlightTimeout);
            activePromotion.classList.remove('is-highlighted');

            window.setTimeout(() => {
                activePromotion.classList.add('is-highlighted');

                this.highlightTimeout = window.setTimeout(() => {
                    activePromotion.classList.remove('is-highlighted');
                }, 1200);
            }, 420);
        });
    }

    render() {
        const { currentMonth, currentPromotion } = this.getCurrentContext();

        this.timeline.innerHTML = this.promotions
            .map((promotion, index) => {
                const state = this.getPromotionState(promotion.monthIndex, currentMonth);
                const sideClass = index % 2 === 0 ? 'promo-node--left' : 'promo-node--right';
                const isInteractive = state === 'active';
                const badgeText = state === 'active' ? 'Activa ahora' : promotion.badge;
                const statusText = this.getStatusLabel(state, promotion);
                const availabilityText = this.getAvailabilityCopy(state, promotion);

                return `
                    <article class="promo-node ${sideClass} is-${state}" data-promo-state="${state}" data-promo-slug="${promotion.slug}">
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
                                        ${isInteractive ? promotion.ctaLabel : 'Próximamente'}
                                    </a>
                                </div>

                                <p class="promo-card__availability">${availabilityText}</p>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join('');

        this.updateSummary(currentPromotion);
    }
}

export const promotionsManager = new PromotionsManager();
export { PromotionsManager };
