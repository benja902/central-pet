# AGENTS.md

Instrucciones para trabajar en este repositorio.

## Alcance

- Este archivo aplica al proyecto en la raiz de `D:\newagallas`.
- No considerar ni modificar la carpeta `newagallas-next` salvo que el usuario lo pida explicitamente.
- Antes de hacer cambios, revisar si existe una instruccion mas especifica en el area que se va a tocar.

## Contexto del proyecto

Sitio web estatico de Agallas con home comercial, carta digital, carrito, promociones, locales y paginas legales.

Archivos principales:

- `index.html`: home del sitio.
- `menu.html`: carta completa con categorias y subcategorias.
- `locales.html`, `promociones.html`, `cupones.html`: paginas auxiliares.
- `politica-privacidad.html`, `terminos-condiciones.html`, `libro-reclamaciones.html`: paginas legales.
- `style2.css`: estilos compartidos del sitio.
- `style-menu.css`: estilos especificos de la carta.
- `locales.css`, `legal-pages.css`: estilos de paginas especificas.
- `cart.js`: logica del carrito.
- `js/main.js`: inicializacion general, navegacion del menu y comportamiento de UI.
- `js/components/ProductManager.js`: cards de producto, modal y acciones del carrito.

## Reglas de mantenimiento

- Mantener los cambios acotados a la tarea solicitada.
- No tocar backups, archivos comprimidos ni carpetas historicas salvo instruccion explicita.
- No sobrescribir cambios existentes del usuario.
- Preservar la estructura HTML actual cuando sea posible.
- Usar texto en espanol para contenido visible del sitio.
- Mantener compatibilidad con Bootstrap cuando aparezca en las paginas.

## CSS

- `style2.css` debe contener estilos compartidos:
  - navbar principal
  - footer
  - cards base de producto
  - modales
  - carrito
  - carruseles
  - utilidades visuales comunes
- `style-menu.css` debe contener solo estilos propios de la carta:
  - navegacion horizontal de categorias
  - fades laterales del menu
  - subnavs sticky
  - offsets y `scroll-margin`
  - variantes visuales de cards dentro del menu
- Evitar modificar `.container` global de Bootstrap. Usar `site-container` para anchos del sitio.

## Menu

- Revisar primero si el cambio pertenece a `menu.html`, `style-menu.css`, `style2.css` o `js/main.js`.
- Mantener las clases base `.product-card` y `.add-to-cart-btn` porque el carrito depende de ellas.
- No mezclar estilos globales del sitio con estilos exclusivos del menu.
- `Para Picar` usa actualmente la variante vertical como prototipo visual.
- La asignacion automatica de variantes en `js/main.js` es temporal; no ampliarla sin necesidad.

## JavaScript

- Mantener la logica del carrito independiente del layout visual de las cards.
- Evitar duplicar logica entre `cart.js`, `menu.js` y `js/main.js`; revisar el uso actual antes de mover codigo.
- Si se cambia comportamiento de tabs, subcategorias o nav sticky, verificar manualmente `menu.html`.

## Verificacion recomendada

- Abrir `index.html` y `menu.html` en navegador cuando se cambie layout, CSS o JS.
- Revisar responsive en mobile y desktop si el cambio afecta menu, navbar, cards o carrito.
- Confirmar que los botones de agregar al carrito siguen funcionando despues de tocar cards o scripts.

