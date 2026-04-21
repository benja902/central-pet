/**
 * Archivo principal de la aplicación
 * Integra todos los módulos y componentes
 */

// Importar todos los componentes
import { cart } from './components/Cart.js';
import { cartUI } from './components/CartUI.js';
import { productManager } from './components/ProductManager.js';
import { productDetailModal } from './components/ProductDetailModal.js';
import { navigation } from './components/Navigation.js';
import { swiperManager } from './components/SwiperManager.js';
import { promotionsManager } from './components/PromotionsManager.js';
import { promotionDetailManager } from './components/PromotionDetailManager.js';
import { homePromotionsManager } from './components/HomePromotionsManager.js';
import { promotionCardEnhancer } from './components/PromotionCardEnhancer.js';
import { recommendedManager } from './components/RecommendedManager.js';

// Importar utilidades
import { delay } from './utils/helpers.js';

class App {
    constructor() {
        this.isInitialized = false;
        this.components = {
            cart,
            cartUI,
            productManager,
            productDetailModal,
            navigation,
            swiperManager,
            promotionsManager,
            promotionDetailManager,
            homePromotionsManager,
            promotionCardEnhancer,
            recommendedManager
        };
        
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.startApp();
            });
        } else {
            this.startApp();
        }
    }

    /**
     * Inicia todos los componentes de la aplicación
     */
    startApp() {
        console.log('🚀 Iniciando aplicación Central Pet...');
        
        try {
            // Los componentes ya se inicializan automáticamente al importarse
            // Aquí podemos añadir lógica adicional de inicialización si es necesaria
            
            this.setupCategoriesNav();
            this.setupMenuCardVariants();
            this.setupMenuSorting();
            this.setupGlobalEventListeners();
            this.setupErrorHandling();
            
            // Marcar como inicializada
            this.isInitialized = true;
            
            console.log('✅ Aplicación Central Pet inicializada correctamente');
            
            // Disparar evento personalizado para notificar que la app está lista
            this.dispatchReadyEvent();
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Configura event listeners globales
     */
    setupGlobalEventListeners() {
        // Listener para cambios de visibilidad de la página
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.handlePageVisible();
            }
        });

        // Listener para resize de ventana
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Listener para beforeunload
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
    }

    /**
     * Marca variantes explícitas para las cards del menú.
     * La base compartida sigue en style2.css y el menú puede extenderla
     * con clases semánticas sin depender de ids de sección.
     */
    setupMenuCardVariants() {
        if (!document.body.classList.contains('menu-page')) return;

        const grids = document.querySelectorAll('.menu-page .products-grid');

        grids.forEach((grid) => {
            if (!grid.classList.contains('products-grid--menu-feature')) {
                grid.classList.add('products-grid--menu-default');
            }
        });

        const cards = document.querySelectorAll('.menu-page .product-card');

        cards.forEach((card) => {
            if (!card.classList.contains('product-card--menu-vertical')) {
                card.classList.add('product-card--menu-default');
            }

            const addButton = card.querySelector('.add-to-cart-btn');

            if (addButton && !addButton.classList.contains('add-to-cart-btn--icon')) {
                addButton.classList.add('add-to-cart-btn--menu-default');
            }
        });
    }

    /**
     * Configura las pistas visuales y flechas del nav principal de categorias
     */
    setupCategoriesNav() {
        const shell = document.querySelector('.categories-nav-shell');
        const menu = document.querySelector('.categories-menu');
        const categoryItems = document.querySelectorAll('.category-item[data-category-filter]');
        const sections = document.querySelectorAll('.tienda-category-section[data-category]');

        if (!shell || !menu) return;

        const updateNavState = () => {
            const maxScroll = Math.max(menu.scrollWidth - menu.clientWidth, 0);
            const isScrollable = maxScroll > 4;
            const atStart = menu.scrollLeft <= 4;
            const atEnd = menu.scrollLeft >= maxScroll - 4;

            shell.classList.toggle('is-scrollable', isScrollable);
            shell.classList.toggle('is-at-start', atStart);
            shell.classList.toggle('is-at-end', atEnd);
        };

        menu.addEventListener('scroll', updateNavState, { passive: true });

        updateNavState();

        this.updateCategoriesNavState = updateNavState;

        if (!categoryItems.length || !sections.length) return;

        const syncCategoryState = (targetCategory = 'all') => {
            const normalizedCategory = targetCategory || 'all';

            categoryItems.forEach((item) => {
                item.classList.toggle('active', item.dataset.categoryFilter === normalizedCategory);
            });

            sections.forEach((section) => {
                const matchesCategory = section.dataset.category === normalizedCategory;
                section.hidden = normalizedCategory !== 'all' && !matchesCategory;
            });

            if (normalizedCategory === 'all') {
                if (window.location.hash) {
                    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
                }
                return;
            }

            const targetSection = document.querySelector(`.tienda-category-section[data-category="${normalizedCategory}"]`);
            if (!targetSection) return;

            window.history.replaceState(null, '', `#${normalizedCategory}`);

            const navTop = document.querySelector('.navbar.fixed-top')?.offsetHeight || 0;
            const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - navTop - 24;
            window.scrollTo({ top: Math.max(sectionTop, 0), behavior: 'smooth' });
        };

        categoryItems.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                syncCategoryState(item.dataset.categoryFilter || 'all');
            });
        });

        const initialHash = window.location.hash.replace('#', '');
        const hasMatchingHash = Array.from(categoryItems).some((item) => item.dataset.categoryFilter === initialHash);
        syncCategoryState(hasMatchingHash ? initialHash : 'all');
    }

    /**
     * Configura el selector de orden del menu editorial.
     */
    setupMenuSorting() {
        if (!document.body.classList.contains('menu-page')) return;

        const sortSelect = document.querySelector('#tiendaSortSelect');
        const grids = document.querySelectorAll('.tienda-category-section .products-grid');

        if (!sortSelect || !grids.length) return;

        grids.forEach((grid) => {
            Array.from(grid.querySelectorAll('.product-card')).forEach((card, index) => {
                if (!card.dataset.originalIndex) {
                    card.dataset.originalIndex = String(index);
                }
            });
        });

        const getCardName = (card) => (
            card.querySelector('h3')?.textContent?.trim().toLowerCase() || ''
        );

        const getCardPrice = (card) => {
            const priceText = card.querySelector('.current-price')?.textContent || '';
            return Number.parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
        };

        const getFeaturedScore = (card) => {
            let score = 0;

            if (card.classList.contains('product-card--promo-live')) score += 3;
            if (card.querySelector('.old-price')) score += 2;
            if (card.querySelector('.promo-card__campaign-label')) score += 1;

            return score;
        };

        const sortGrid = (grid, sortValue) => {
            const cards = Array.from(grid.querySelectorAll('.product-card'));

            cards.sort((cardA, cardB) => {
                switch (sortValue) {
                    case 'name-asc':
                        return getCardName(cardA).localeCompare(getCardName(cardB), 'es');
                    case 'name-desc':
                        return getCardName(cardB).localeCompare(getCardName(cardA), 'es');
                    case 'price-asc':
                        return getCardPrice(cardA) - getCardPrice(cardB);
                    case 'price-desc':
                        return getCardPrice(cardB) - getCardPrice(cardA);
                    case 'featured': {
                        const scoreDiff = getFeaturedScore(cardB) - getFeaturedScore(cardA);
                        if (scoreDiff !== 0) return scoreDiff;
                        return Number(cardA.dataset.originalIndex) - Number(cardB.dataset.originalIndex);
                    }
                    case 'default':
                    default:
                        return Number(cardA.dataset.originalIndex) - Number(cardB.dataset.originalIndex);
                }
            });

            cards.forEach((card) => {
                grid.appendChild(card);
            });
        };

        const applySorting = () => {
            const sortValue = sortSelect.value || 'default';

            grids.forEach((grid) => {
                sortGrid(grid, sortValue);
            });
        };

        sortSelect.addEventListener('change', applySorting);
    }

    /**
     * Configura el manejo global de errores
     */
    setupErrorHandling() {
        // Capturar errores no manejados
        window.addEventListener('error', (event) => {
            console.error('Error no manejado:', event.error);
            this.logError('window_error', event.error);
        });

        // Capturar promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promesa rechazada no manejada:', event.reason);
            this.logError('unhandled_rejection', event.reason);
        });
    }

    /**
     * Maneja cuando la página se vuelve visible
     */
    handlePageVisible() {
        console.log('🔄 Página visible, sincronizando datos...');
        
        // Sincronizar carrito desde localStorage
        if (this.components.cart) {
            this.components.cart.loadFromStorage();
        }
        
        // Actualizar UI
        if (this.components.cartUI) {
            this.components.cartUI.forceUpdate();
        }
    }

    /**
     * Maneja el resize de la ventana
     */
    handleWindowResize() {
        if (this.updateCategoriesNavState) {
            this.updateCategoriesNavState();
        }

        // Actualizar swipers si es necesario
        delay(() => {
            if (this.components.swiperManager) {
                this.components.swiperManager.updateAll();
            }
        }, 250);
    }

    /**
     * Maneja eventos antes de cerrar la página
     */
    handleBeforeUnload() {
        // Guardar cualquier estado pendiente
        console.log('📱 Guardando estado antes de cerrar...');
    }

    /**
     * Maneja errores de inicialización
     */
    handleInitializationError(error) {
        // En un entorno de producción, aquí se podría enviar el error a un servicio de logging
        console.error('Error de inicialización detallado:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Registra errores para debugging
     */
    logError(type, error) {
        const errorInfo = {
            type,
            message: error?.message || 'Error desconocido',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        console.error('Error registrado:', errorInfo);
        
        // En producción, aquí se enviaría a un servicio de logging
    }

    /**
     * Dispara evento personalizado cuando la app está lista
     */
    dispatchReadyEvent() {
        const readyEvent = new CustomEvent('agallasAppReady', {
            detail: {
                timestamp: new Date().toISOString(),
                components: Object.keys(this.components)
            }
        });
        
        document.dispatchEvent(readyEvent);
    }

    /**
     * Método público para obtener el estado de la aplicación
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            cartItemsCount: this.components.cart?.getTotalItemsCount() || 0,
            cartTotal: this.components.cart?.totalPrice || 0
        };
    }

    /**
     * Método público para reinicializar componentes
     */
    reinitialize() {
        console.log('🔄 Reinicializando aplicación...');
        
        try {
            // Reinicializar swipers
            if (this.components.swiperManager) {
                this.components.swiperManager.reinitialize();
            }
            
            // Forzar actualización de UI
            if (this.components.cartUI) {
                this.components.cartUI.forceUpdate();
            }
            
            if (this.components.navigation) {
                this.components.navigation.forceUpdate();
            }
            
            console.log('✅ Reinicialización completada');
        } catch (error) {
            console.error('❌ Error en reinicialización:', error);
        }
    }

    /**
     * Método de limpieza para destruir la aplicación
     */
    destroy() {
        console.log('🧹 Destruyendo aplicación...');
        
        try {
            // Destruir swipers
            if (this.components.swiperManager) {
                this.components.swiperManager.destroyAll();
            }
            
            this.isInitialized = false;
            console.log('✅ Aplicación destruida correctamente');
        } catch (error) {
            console.error('❌ Error al destruir aplicación:', error);
        }
    }
}

// Crear instancia global de la aplicación
const app = new App();

// Exportar instancia y clase para uso externo
export { app, App };

// Hacer disponible globalmente para debugging
if (typeof window !== 'undefined') {
    window.AgallasApp = app;
}
