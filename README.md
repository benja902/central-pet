# Nueva Agallas

Sitio web estatico de Agallas con carrito, home comercial y carta digital.

## Estructura actual

- `index.html`: home con hero, carruseles de recomendados y promociones.
- `menu.html`: carta completa con navegacion fija por categorias y subcategorias.
- `locales.html`, `promociones.html`, `cupones.html` y paginas legales: vistas auxiliares del sitio.
- `style2.css`: base compartida del proyecto.
- `style-menu.css`: estilos especificos de la carta.
- `js/main.js`: inicializacion general, navs del menu, subcategorias y helpers de UI.
- `js/components/ProductManager.js`: logica de cards, modal de producto y carrito.

## Responsabilidad de los CSS

### `style2.css`

Debe contener solo estilos compartidos:

- navbar principal
- footer
- cards base de producto
- modales
- carrito
- carruseles y componentes comunes
- utilidades visuales del sitio

### `style-menu.css`

Debe contener solo estilos propios del menu:

- nav horizontal de categorias del menu
- fades laterales del nav
- subnavs sticky por seccion
- offsets y `scroll-margin` del menu
- variantes visuales propias de la carta

## Containers

Se usa `site-container` para controlar el ancho del contenido sin sobrescribir el `.container` global de Bootstrap.

- desktop: ancho controlado y centrado
- responsive: ancho completo con padding lateral pequeno

Esto evita conflictos con Bootstrap y hace mas facil ajustar el layout del menu por separado.

## Estado actual del menu

- La navegacion principal de categorias usa imagen + texto.
- El nav principal ya no usa flechas; ahora la pista visual es el fade lateral.
- Las subcategorias funcionan como tabs/filtros dentro de una misma seccion.
- `Todos` muestra una sola grilla continua, sin huecos entre subbloques.
- `Arroces y Chaufas` ya esta unificado en una sola categoria.
- `Bebidas` ya esta unificado en una sola categoria con subcategorias internas.
- `Cervezas` sigue aparte y se divide en `Todas`, `Nacionales`, `Importadas` y `Artesanales`.

## Variantes de cards

La base compartida sigue viviendo en `style2.css`.

En el menu existen estas variantes:

- `products-grid--menu-default`
- `product-card--menu-default`
- `add-to-cart-btn--menu-default`
- `products-grid--menu-feature`
- `product-card--menu-vertical`
- `add-to-cart-btn--icon`

### Importante

Por ahora solo `Para Picar` usa la variante vertical como prototipo visual.

El resto de categorias del menu sigue usando la card base.

## JS del menu

`js/main.js` actualmente hace estas tareas importantes:

- inicializa el fade del nav principal del menu
- arma la logica de tabs/subcategorias
- combina las subsecciones en una sola grilla cuando se usa `Todos`
- agrega clases de variante por defecto al menu como solucion de transicion

### Nota tecnica

La asignacion automatica de clases de variante en `main.js` es temporal.
Si en el futuro el sistema visual del menu se consolida, conviene mover esas clases directamente al HTML.

## Carrito

La logica del carrito no debe depender del layout visual de las cards.

Se mantiene compatible porque:

- la estructura base de `.product-card` sigue existiendo
- el boton de agregar sigue usando `.add-to-cart-btn`
- `ProductManager.js` restaura el boton con icono `+` cuando `data-button-variant="icon"`

## Proximo trabajo recomendado

1. decidir si la card vertical se extiende a mas categorias
2. si se confirma, mover las clases de variante al HTML y reducir logica transitoria en `main.js`
3. reemplazar imagenes genericas `img/1.jpg` por imagenes reales de cada categoria
4. seguir unificando nomenclatura visual: tildes, mayusculas y textos del menu

## Regla de mantenimiento

Antes de tocar el menu:

- revisar si el cambio pertenece a `style2.css` o a `style-menu.css`
- evitar volver a meter estilos globales del menu dentro del CSS compartido
- evitar sobrescribir `.container` de Bootstrap de forma global
