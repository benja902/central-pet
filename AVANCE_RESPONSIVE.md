# Avance de auditoria y migracion responsive

Este documento registra el avance realizado durante el chat sobre carrito, responsive, accesibilidad de movimiento, limpieza de media queries y migracion mobile-first del sitio Agallas.

La intencion es que el trabajo pueda retomarse sin perder contexto ni repetir decisiones ya aprobadas.

## Alcance del trabajo

- Proyecto: sitio estatico Agallas en `D:\newagallas`.
- No se considera ni se toca `newagallas-next`.
- Archivos principales revisados durante el proceso:
  - `index.html`
  - `menu.html`
  - `locales.html`
  - `promociones.html`
  - `promocion-detalle.html`
  - `cupones.html`
  - `style2.css`
  - `style-menu.css`
  - `locales.css`
  - `legal-pages.css`
  - `js/breakpoints.js`
  - `js/components/SwiperManager.js`
  - `js/components/PromotionDetailManager.js`
  - `js/components/PromotionsManager.js`
  - `js/data/promotions-data.js`

## Decisiones iniciales

- `cupones.html` ya no se esta considerando dentro del flujo actual, por lo que no se debe incluir en decisiones nuevas del carrito ni en validaciones principales de responsive.
- El carrito debe revisarse como elemento compartido en las paginas relevantes del sitio, pero no en `cupones.html`.
- El responsive debe funcionar bien en movil, tablet y desktop.
- Se pidio revisar especialmente si algo se ocultaba indebidamente en tablet.
- La migracion responsive debe ser controlada por fases, no como refactor masivo.

## Reglas de auditoria aprobadas por el usuario

Se establecieron estas reglas como base del analisis:

- Usar mobile-first: estilos base para movil sin media query.
- Evitar desktop-first con `max-width`, salvo cuando haya una razon clara durante la transicion.
- Los breakpoints deben responder al punto donde el layout se rompe, no a dispositivos especificos.
- Usar como referencia:
  - base sin query para movil menor a `576px`
  - `min-width: 576px`
  - `min-width: 768px`
  - `min-width: 992px`
  - `min-width: 1200px`
  - `min-width: 1400px`
- Cualquier valor fuera de esos breakpoints debe estar justificado con comentario.
- No mezclar `min-width` y `max-width` sin razon clara.
- Toda animacion o transicion debe respetar `prefers-reduced-motion`.
- Los componentes reutilizables deberian migrarse a `@container` cuando corresponda.
- No usar `!important` dentro de media queries.
- No definir colores de marca ni tipografia base dentro de media queries.
- No duplicar media queries para el mismo breakpoint y responsabilidad.
- Si Bootstrap 5 aplica, respetar su sistema y evitar tocar `.container` global.

## Auditoria inicial

Se hizo una auditoria del responsive y se genero un plan por puntos.

El usuario decidio trabajar primero sobre accesibilidad de movimiento y luego sobre limpieza, estandarizacion y migracion mobile-first.

## Puntos 4 y 5 - Movimiento y reduced motion

Estado: completado y aprobado.

### Punto 4

Se movieron animaciones y transiciones para que queden bajo `@media (prefers-reduced-motion: no-preference)` cuando aplicaba.

Keyframes revisados:

- `shine`
- `cartPulseMobile`
- `cartPulseDesktop`
- `promoPulse`
- `promoCardFocus`

### Punto 5

Se agrego alternativa estatica para usuarios con reduccion de movimiento activada.

Decision importante del usuario:

- No basta con quitar animaciones.
- Para `prefers-reduced-motion: reduce`, cada elemento debe mostrar un estado final estatico valido.

Estados estaticos definidos:

- `shine`: sin brillo, elemento en color base.
- `cartPulseMobile` y `cartPulseDesktop`: carrito en tamano final sin escala.
- `promoPulse`: promo en opacidad y escala final.
- `promoCardFocus`: card en estado de foco sin transformacion.

## Fase 2 - Limpieza

Estado: completada y aprobada.

### Punto 3 - Eliminar duplicados de media queries

Archivos revisados:

- `style2.css`
- `style-menu.css`
- `locales.css`
- `legal-pages.css`

Objetivo:

- Eliminar media queries duplicadas para el mismo breakpoint, componente o responsabilidad.
- Consolidar reglas repetidas.
- Revisar especialmente sliders de productos en `style2.css`, donde habia duplicacion en zonas separadas del archivo.

Resultado:

- Se consolidaron reglas duplicadas.
- Se conservaron versiones mas completas o mas recientes.
- Se dejaron comentarios cuando se elimino redundancia relevante.

### Punto 6 - Quitar `!important` dentro de media queries

Estado: completado y aprobado.

Objetivo:

- Eliminar `!important` dentro de bloques `@media`.
- Resolver especificidad real por orden, selector o cascada.

Archivo principal con detecciones:

- `style2.css`

Resultado:

- Se quitaron `!important` detectados dentro de media queries.
- Se evito usar `!important` como solucion alternativa.

## Fase 3 - Estandarizacion de breakpoints

Estado: completada y aprobada.

### Punto 2 - Normalizar breakpoints CSS

Valores objetivo:

- `576px`
- `768px`
- `992px`
- `1200px`
- `1400px`

Valores migrados o evaluados:

- `767px` y `767.98px` hacia `768px`
- `991px` y `991.98px` hacia `992px`
- `1279px` y `1279.98px` evaluados para `1280px` o `1200px` segun contexto
- `480px` y `420px` evaluados para subir a `576px` o justificar

Resultado:

- Se redujeron breakpoints raros.
- Cuando se mantuvo un valor no estandar, se documento o se trato como excepcion temporal.

### Punto 11 - Centralizar breakpoints en JavaScript

Estado: completado y aprobado.

Decision tecnica:

- Primero se reviso como estaban cargados los scripts.
- Como el proyecto usa modulos ES en algunos archivos, se permitio usar `export` e `import`.

Archivo creado:

- `js/breakpoints.js`

Contenido conceptual:

```js
const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
```

Archivos revisados o ajustados:

- `js/components/PromotionDetailManager.js`
- `js/components/PromotionsManager.js`
- `js/components/SwiperManager.js`

Detalle importante:

- En `SwiperManager.js` se revisaron breakpoints de Swiper.
- Se mantuvo la logica de slides por breakpoint alineada con la estrategia CSS:
  - movil
  - tablet
  - laptop
  - desktop grande

## Fase 4 - Reestructura responsive mobile-first

La migracion a mobile-first se acordo como proceso cuidadoso:

- No es solo invertir `max-width` por `min-width`.
- Primero se identifica que estilos son base movil.
- Esos estilos salen fuera de media queries.
- Tablet y desktop restauran progresivamente lo necesario.
- Si un estilo es igual en movil y desktop, queda una sola vez en base.

## Migracion de `legal-pages.css`

Estado: completada y aprobada.

Proceso aplicado:

- Primero se mostro inventario de media queries actuales.
- Luego se migro a mobile-first.
- Se valido visualmente antes de cerrar.

Validacion requerida y realizada:

- `375px`
- `768px`
- `1200px`

Resultado:

- El contenido legal se mantiene legible en movil, tablet y desktop.
- La base movil quedo fuera de media queries.
- Lo que necesitaba restauracion de escritorio quedo en `min-width`.

## Migracion de `locales.css`

Estado: completada y aprobada.

Proceso aplicado:

- Se migro a mobile-first.
- Se reviso especialmente que en responsive no se ocultaran elementos importantes.
- Se valido que `locales.html` mantuviera lectura y estructura en movil/tablet/desktop.

Resultado:

- Se corrigio el comportamiento responsive que en un inicio se habia detectado como problematico en `locales`.
- La pagina quedo aprobada por el usuario.

## Migracion de `style-menu.css`

Estado: completada y aprobada.

Proceso aplicado:

- Primero se mostro listado completo de media queries actuales.
- Se identifico que el archivo controla navegacion critica del menu.
- Se permitio justificar casos donde un `max-width` pudiera tener sentido, pero se migro finalmente a mobile-first.

Orden de capas aprobado:

- Base movil menor a `576px`
- `min-width: 576px`: movil grande, subnav intermedio
- `min-width: 768px`: tablet, navegacion, offsets y grid de 3 columnas
- `min-width: 992px`: laptop, `category-item` desktop y grid de 4 columnas
- `min-width: 1200px`: desktop grande, grid de 5 columnas

Validacion requerida y realizada:

- `menu.html` en `375px`
  - navegacion sticky
  - scroll horizontal de categorias
  - subnav
  - cards en 2 columnas
- `menu.html` en `768px`
  - offsets correctos
  - grid en 3 columnas
  - subnav con tamanos tablet
- `menu.html` en `1200px`
  - grid en 5 columnas
  - `category-items` con tamano desktop
- `promocion-detalle.html` en `375px` y `768px`
  - grid de cards
  - controles de carrito sin roturas

Resultado:

- `style-menu.css` quedo aprobado.

## Migracion de `style2.css`

Por ser el archivo mas grande y riesgoso, el usuario pidio migrarlo por bloques y no completo.

Inventario inicial agrupado:

- Seccion 1: Contenedor global
- Seccion 2: Movimiento y animaciones
- Seccion 3: Sliders Home de Productos
- Seccion 4: Navbar / Header / Layout general
- Seccion 5: Home Mobile General
- Seccion 6: Home Movil Pequeno
- Seccion 7: Modal de Producto
- Seccion 8: Promociones Pagina Calendario
- Seccion 9: Promocion Detalle

Orden aprobado:

1. Fase 1: Modal de Producto
2. Fase 2: Sliders Home de Productos
3. Fase 3: Promocion Detalle y Promociones Pagina Calendario
4. Fase 4: Contenedor Global y Navbar/Header/Layout general
5. Fase 5: Home Mobile General integrado con Home Movil Pequeno
6. Fase 6: Movimiento y Animaciones solo si sigue siendo necesario

## `style2.css` - Fase 1, Seccion 7: Modal de Producto

Estado: completada y aprobada.

Selectores analizados:

- `.product-detail-modal`
- `.product-detail-image`
- `.product-detail-info`

Plan aprobado:

- Extraer reglas moviles del bloque mobile general hacia la base del componente.
- Dejar intacto el `@media (min-width: 768px)` existente.
- Verificar si habia reglas base/desktop superiores que necesitaran restauracion.

Validacion requerida:

- Abrir modal real en `index.html` o `menu.html`.
- Revisar en:
  - `375px`
  - `768px`
  - `1200px`
- Confirmar:
  - ancho del modal
  - altura de imagen
  - padding de info
  - layout horizontal desde tablet

Resultado:

- Modal de producto migrado a base movil.
- No se reporto regresion visual.

## `style2.css` - Fase 2, Seccion 3: Sliders Home de Productos

Estado: completada y aprobada.

Objetivo esperado:

- Base movil: 2 cards
- `min-width: 768px`: 3 cards
- `min-width: 992px`: 4 cards
- `min-width: 1200px`: 5 cards

Decision importante:

- Los calculos de ancho/flex no deben ir en selector global `.product-swiper .swiper-slide`.
- El selector global solo debe mantener reglas estructurales comunes.
- Los calculos de 2/3/4/5 cards deben quedar scopeados a:
  - `#recomendados-section .product-swiper .swiper-slide`
  - `#promociones-section .product-swiper .swiper-slide`

Validacion requerida:

- `index.html` en:
  - `375px`
  - `768px`
  - `992px`
  - `1200px`
- Revisar:
  - `#recomendados-section`
  - `#promociones-section`
  - cantidad visible de cards
  - ancho de cada slide
  - ausencia de cortes raros o cards parcialmente visibles

Resultado:

- Se reemplazo la logica anterior por capas `min-width`.
- No se reporto regresion visual.

## `style2.css` - Fase 3, Seccion 9: Promocion Detalle

Estado: completada y aprobada.

Selectores analizados:

- `.promotion-detail-main`
- `.promotion-detail-hero`
- `.promotion-detail-title`
- subtitle / heading
- back link
- kicker / labels
- benefit / support / campaign sections

Condicion importante:

- No inventar valores tablet nuevos si no existian diferencias claras.
- Si un subbloque no necesitaba capa intermedia real, mantener base movil hasta `992px`.

Validacion requerida:

- `promocion-detalle.html` en:
  - `375px`
  - `768px`
  - `992px`
  - `1200px`
- Comprobar:
  - hero
  - titulo
  - subtitle
  - back link
  - kicker/labels
  - benefit
  - support
  - section heading
  - terms card

Resultado:

- Base movil real.
- `min-width: 768px` solo donde habia capa tablet real.
- `min-width: 992px` para restaurar jerarquia desktop/editorial.
- No se reporto regresion visual.

## `style2.css` - Fase 3, Seccion 8: Promociones Pagina Calendario

Estado: completada y aprobada.

Selectores y partes analizadas:

- `.promotions-main`
- `.promotions-hero`
- timeline vertical
- `.promo-node`
- `.promo-node__spine`
- `.promotions-timeline::before`
- `.promo-card`
- titulos
- lead
- summary
- CTA
- precios
- disponibilidad

Condiciones:

- Base movil real usando combinacion previa de menor a `768px` y menor a `576px`.
- `min-width: 768px` solo para restaurar capa tablet existente.
- `min-width: 992px` para restaurar base desktop/editorial completa.
- No introducir ajustes visuales extra ni rediseno.

Validacion requerida:

- `promociones.html` en:
  - `375px`
  - `768px`
  - `992px`
  - `1200px`
- Comprobar:
  - hero
  - timeline
  - `.promo-node`
  - `.promo-node__spine`
  - `.promotions-timeline::before`
  - `.promo-card`
  - footer
  - CTA
  - precios
  - disponibilidad
  - alternancia izquierda/derecha en desktop

Correcciones adicionales pedidas por el usuario:

- `.promo-node__spine` debia quedar al centro en desktop, entre el contenido del nodo y las cards.
- `.promo-node__content` en mobile/tablet debia ir alineado a la izquierda.

Resultado final aprobado:

- `.promo-node__spine` restaurado al centro en desktop.
- `.promo-node__content` alineado a la izquierda en mobile/tablet.
- Alternancia restaurada en desktop.
- Se aprobo la seccion.

## `style2.css` - Fase 4, Seccion 1: Contenedor Global

Estado: completada y aprobada.

Selector:

- `.site-container`

Decision importante:

- No tocar `.container`, `.navbar .container` ni contenedores globales de Bootstrap.
- Mantener corte fiel al comportamiento anterior: antes `max-width: 768px` incluia `768px` como movil.
- Por eso la restauracion grande se hizo en `min-width: 769px`, no en `768px`.

Base movil aprobada:

- `width: 100%`
- `max-width: none`
- `margin: 0 auto`
- `padding-left: 12px`
- `padding-right: 12px`

Restauracion en `min-width: 769px`:

- `width: 90%`
- `max-width: 1280px`
- `padding-left: 0`
- `padding-right: 0`

Validacion requerida:

- `index.html`
- `menu.html`
- `promociones.html`
- `promocion-detalle.html`

Anchos:

- `375px`
- `768px`
- `1200px`

Resultado:

- Se valido ancho general, padding lateral y alineacion.
- Especial cuidado en `768px` exactos.
- No se reporto regresion visual.

## `style2.css` - Fase 4, Seccion 4: Navbar / Header / Layout general

Estado: completada y aprobada.

Selectores analizados:

- `.navbar-collapse`
- `.navbar .container`
- `.navbar-brand`
- `.quick-access-icons`
- `.navbar-toggler`
- `.hero-section`
- `.user-whatsapp .whatsapp-text`
- `.nav-icon-link`
- `.phone-container`
- `.phone-text`
- `.whatsapp-text`
- `.cart-price`
- `.cart-icon-container`
- reglas que ocultan o restauran elementos del header

Condiciones aprobadas:

- No redisenar.
- No tocar comportamiento fuera de responsive.
- No cambiar espaciados ni tipografias salvo que ya fueran parte de la logica responsive actual.
- Si un subbloque no necesitaba capa en `768px`, mantener base movil hasta `992px`.

Excepcion documentada:

- Se acepto `@media (min-width: 577px)` solo para `.hero-section`, como inversion fiel del antiguo `max-width: 576px`.
- No se considera breakpoint estandar nuevo del proyecto.

Restauracion desktop esencial:

- `.navbar-collapse`
- `.navbar .cart-icon-container`
- `.phone-container`
- `.phone-text`
- `.whatsapp-text`
- `.cart-price`
- `.hero-section`

Condicion adicional:

- Solo restaurar `position: static` o `z-index: auto` en `.navbar-brand`, `.quick-access-icons` o `.navbar-toggler` si habia regresion visual por herencia movil.

Validacion requerida:

- `index.html`
- `menu.html`
- `promociones.html`
- `promocion-detalle.html`

Anchos:

- `375px`
- `768px`
- `992px`
- `1200px`

Comprobaciones:

- menu colapsado vs desktop
- toggler
- brand
- quick-access-icons
- carrito
- textos de telefono/WhatsApp
- hero
- ocultamiento/restauracion entre movil y desktop

Resultado:

- Base movil del header quedo sin query.
- Se restauro desktop desde los breakpoints necesarios.
- Se aprobo la fase.

## `style2.css` - Fase 5: Home Mobile General + Home Movil Pequeno

Estado: en progreso.

El usuario pidio no migrar todo de una vez porque es el bloque mas grande y riesgoso.

Inventario interno agrupado:

- hero
- texto del hero
- banner movil
- titulos de seccion
- padding de carruseles
- grid de productos
- cards y variantes verticales
- imagenes de cards
- footer acordeon
- delivery banner / selector
- cart modal movil
- product detail modal movil

Decisiones:

- No tocar `hero`, porque ya fue migrado en Fase 4.
- No tocar `product detail modal movil`, porque ya fue migrado en Fase 1.

Orden aprobado:

### Subfase 5.1 - Riesgo bajo

1. texto del hero
2. titulos de seccion
3. delivery banner / selector

### Subfase 5.2 - Riesgo medio

4. footer acordeon
5. banner movil

### Subfase 5.3 - Riesgo alto

6. grid de productos
7. padding de carruseles

### Subfase 5.4 - Riesgo muy alto

8. cards y variantes verticales
9. imagenes de cards
10. cart modal movil

## Subfase 5.1 - Texto del hero, titulos de seccion y delivery banner/selector

Estado: completada y aprobada.

Condiciones:

- Base movil real.
- `min-width: 577px` solo donde hiciera falta por la antigua capa `max-width: 576px`.
- `min-width: 769px` para restaurar lo que antes dejaba de aplicar despues de `max-width: 768px`.
- No usar `font-size: initial` ni `font-size: inherit`.
- Si era necesario restaurar `.delivery-selector`, usar valor efectivo real.

Cambios hechos:

- `.delivery-banner` base movil:
  - `margin-top: 50px`
- `.delivery-selector` base movil:
  - `font-size: 0.9rem`
- `.hero-content h1` base movil:
  - `font-size: 1.8rem`
  - `margin-bottom: 0.5rem`
- `.hero-content p` base movil:
  - `font-size: 0.9rem`
  - `margin-bottom: 1.5rem`
- `.section-title` base movil:
  - `font-size: 1.8rem`

En `min-width: 577px`:

- `.hero-content h1`:
  - `font-size: 2rem`
  - `margin-bottom: 0.5rem`

En `min-width: 769px`:

- `.hero-content h1`:
  - `font-size: 3.5rem`
  - `margin-bottom: 1rem`
- `.hero-content p`:
  - `font-size: 1.2rem`
  - `margin-bottom: 2rem`
- `.section-title`:
  - `font-size: 2rem`
- `.delivery-banner`:
  - `margin-top: 56px`
- `.delivery-selector`:
  - `font-size: 1rem`

Validacion realizada:

- `index.html`
- `375px`
- `576px`
- `768px`
- `1200px`

Comprobaciones:

- jerarquia visual del hero
- tamano del `h1`
- tamano del texto del hero
- tamano de `.section-title`
- separacion del delivery banner bajo el header
- tamano de `.delivery-selector`

Nota:

- En el HTML actual los textos `h1/p` del hero estan comentados en los slides, por lo que la validacion visual directa de esos textos no se ve en portada.
- Las reglas CSS quedaron listas y con tamanos correctos por breakpoint.

Resultado:

- No se reporto regresion visual.
- `git diff --check -- style2.css` paso limpio, salvo warning normal de CRLF.

## Subfase 5.2 - Footer acordeon

Estado: completada y aprobada pendiente de confirmacion final del usuario para pasar al banner movil.

Condiciones:

- Trabajar solo footer acordeon.
- No tocar banner movil.
- No tocar JS ni clases de estado.
- Base movil con footer en una columna y comportamiento acordeon.
- Restauracion desktop en `min-width: 769px`.
- Contenido siempre visible en desktop aunque exista `.is-open`.
- Priorizar:
  - `.footer-grid`
  - `.accordion-content`
  - `.accordion-icon`
  - `.footer-column`
- No hacer limpieza extra en `.accordion-header` si no era necesaria visualmente.

Cambios hechos en base movil:

- `.footer-grid`:
  - `display: grid`
  - `grid-template-columns: 1fr`
  - `gap: 0`
- `.footer-column`:
  - `padding: 1rem 0`
  - `border-bottom: 1px solid #eee`
- `.footer-column:last-child`:
  - `border-bottom: none`
- `.accordion-header`:
  - `display: flex`
  - `justify-content: space-between`
  - `align-items: center`
  - `cursor: pointer`
- `.accordion-icon`:
  - `display: inline-block`
- `.accordion-content`:
  - `max-height: 0`
  - `overflow: hidden`
  - `padding-left: 1rem`
- `.accordion-item.is-open .accordion-content`:
  - `max-height: 500px`
- `.accordion-item.is-open .accordion-icon`:
  - `transform: rotate(180deg)`

Restauracion en `min-width: 769px`:

- `.footer-grid`:
  - `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`
  - `gap: 2.5rem`
- `.footer-column`:
  - `padding: 0`
  - `border-bottom: 0`
- `.accordion-icon`:
  - `display: none`
- `.accordion-content`,
  `.accordion-item.is-open .accordion-content`:
  - `max-height: none`
  - `overflow: visible`
  - `padding-left: 0`

Validacion requerida y realizada:

- `index.html`
- `menu.html`
- `promociones.html`
- `promocion-detalle.html`

Anchos:

- `375px`
- `768px`
- `1200px`

Comprobaciones:

- footer en una columna en movil/tablet
- icono visible en movil/tablet
- acordeon visualmente correcto
- footer normal/no acordeon en desktop
- contenido visible en desktop incluso si existe `.is-open`

Resultado:

- No se reporto regresion visual.
- Se limpiaron espacios finales detectados por `git diff --check`.
- `git diff --check -- style2.css` paso limpio, salvo warning normal de CRLF.

## Pendiente inmediato

Siguiente bloque aprobado por orden, pero aun no ejecutado:

- Subfase 5.2, segundo subbloque:
  - banner movil

Debe hacerse antes de pasar a Subfase 5.3.

## Pendientes posteriores

### Subfase 5.3 - Riesgo alto

- grid de productos
- padding de carruseles

Requiere plan previo antes de escribir cambios.

### Subfase 5.4 - Riesgo muy alto

- cards y variantes verticales
- imagenes de cards
- cart modal movil

Requiere plan previo y validacion cuidadosa.

## Fase 6 - Cierre tecnico

Cerrada sin cambios adicionales de codigo.

### Seccion 2 - Movimiento y Animaciones

Estado final documentado:

- La accesibilidad de movimiento ya quedo resuelta.
- No quedan `max-width` anidados dentro de `prefers-reduced-motion`.
- El unico nesting responsive que permanece dentro de motion es el de `.cart-modal` en `min-width: 769px`.
- Ese nesting se conserva porque representa correctamente la diferencia entre bottom sheet movil y panel lateral desktop.
- No se realiza limpieza cosmetica adicional en esta seccion.

## Puntos pendientes del plan global original

### Punto 8 - Reorganizar media queries al final de cada archivo

Pendiente.

Objetivo:

- Mover media queries al final de cada CSS.
- Agrupar de menor a mayor:
  - `min-width: 576px`
  - `min-width: 768px`
  - `min-width: 992px`
  - `min-width: 1200px`
  - `min-width: 1400px`
  - `prefers-reduced-motion`
  - `print`
- Agrupar reglas por componente con comentarios.

Nota:

- Este punto debe hacerse despues de terminar la migracion mobile-first de las secciones grandes.

### Punto 7 - Migrar componentes reutilizables a `@container`

Pendiente.

Componentes candidatos:

- `.product-card`
- `.card-image-container`
- `.add-to-cart-btn`
- variantes de cards
- sliders

Condicion:

- Identificar componentes que aparecen en mas de un contexto y actualmente dependen de `@media` global.
- Agregar `container-type: inline-size` al padre correspondiente.
- Reemplazar `@media` por `@container` donde sea razonable.

### Punto 10 - Agregar `@media print` a paginas legales

Pendiente.

Archivo principal:

- `legal-pages.css`

Paginas:

- `politica-privacidad.html`
- `terminos-condiciones.html`
- `libro-reclamaciones.html`

Objetivo:

- Ocultar navegacion, footer, botones y decoracion.
- Mostrar contenido legal con tipografia legible en papel.
- Usar fuente serif, minimo `12pt`, negro puro.
- Forzar saltos de pagina donde corresponda.

### Punto 12 - Landscape

Pendiente.

Pregunta a resolver antes de escribir codigo:

- Si hay diferencias visuales importantes entre portrait y landscape en mobile/tablet que no esten cubiertas por breakpoints actuales.
- Si no hay diferencias, documentar en comentario al inicio del CSS principal que landscape no requiere tratamiento especial.

### Punto 13 - Dark mode

Pendiente.

Pregunta a resolver antes de escribir codigo:

- Si el proyecto tiene o tendra modo oscuro.
- Si si, proponer donde implementar `@media (prefers-color-scheme: dark)`.
- Si no, documentar la decision al inicio del CSS principal.

## Validaciones usadas durante el proceso

Herramientas y criterios:

- Servidor local con Python HTTP server.
- Capturas con Playwright en Chromium.
- Validaciones en anchos:
  - `375px`
  - `576px`
  - `768px`
  - `992px`
  - `1200px`
- Revision visual de:
  - header
  - hero
  - cards
  - sliders
  - footer
  - promociones
  - timeline
  - modal de producto
  - carrito
- `git diff --check -- style2.css` para verificar whitespace.

## Notas tecnicas importantes

- El proyecto tiene CSS plano, no Sass/SCSS.
- Se debe evitar tocar `.container` global de Bootstrap.
- Se usa `.site-container` para ancho del sitio.
- `cupones.html` queda fuera del flujo actual.
- No se debe modificar `backup_v2` ni backups salvo instruccion explicita.
- No se deben tocar JS ni clases de estado del footer acordeon durante esta fase.
- La carpeta `test-results/` aparece como no trackeada; no forma parte del trabajo responsive salvo que el usuario pida revisarla.
- `style2.css` aparece modificado y puede tener cambios acumulados de fases anteriores.

## Estado actual al cerrar este documento

Completado y aprobado:

- Auditoria responsive inicial.
- Puntos 4 y 5 de movimiento/reduced motion.
- Fase 2 de limpieza.
- Fase 3 de breakpoints CSS/JS.
- `legal-pages.css`.
- `locales.css`.
- `style-menu.css`.
- `style2.css`:
  - modal de producto
  - sliders home de productos
  - promocion detalle
  - promociones calendario
  - contenedor global
  - navbar/header/layout general
  - Subfase 5.1
  - Subfase 5.2 footer acordeon
  - Subfase 5.2 banner movil
  - Subfase 5.3 padding de carruseles
  - Subfase 5.4 imagenes de cards
  - cart modal migrado en CSS; validacion visual aprobada
  - Fase 6 Seccion 2 movimiento y animaciones cerrada sin cambios adicionales

Siguiente paso:

- Resolver decisiones pendientes del plan global original:
  - Punto 7 `@container`
  - Punto 8 reorganizar media queries al final
  - Punto 10 `@media print`
  - Punto 12 landscape
  - Punto 13 dark mode
