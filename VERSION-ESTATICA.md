# Versión estática de la landing de Drilo

Fase 4 de [PLAN-LANDING.md](PLAN-LANDING.md), preparada el **22 de noviembre de 2026**. Completa el recorrido visual sobre la propuesta de [DISENO-VISUAL.md](DISENO-VISUAL.md) y adelanta movimiento vinculado al scroll por petición del usuario. La fase Animación conserva pendientes propios; no se da por finalizada.

## Dirección y continuidad

Se mantienen los seis colores propuestos, Georgia en títulos y Trebuchet MS en cuerpo. El río organiza el recorrido: bienvenida de papel amarillo, presentación de Drilo sobre blanco, cauce azul verdoso para la historia, pausa amarilla para conversar y orilla clara para encontrar el libro. El pie verde cierra el recorrido. Los textos se alinean a la izquierda y los párrafos mantienen su ancho de lectura.

La decisión distintiva se concentra en el río que acompaña los tres momentos de Historia. Se evitan entradas repetidas de párrafos, nuevos textos editoriales e ilustraciones inventadas. `RiverJourney.astro` dibuja un cauce, vegetación y una hoja; la hoja es escenografía, no una representación de Drilo. `section.illustration` también permite incorporar el original de Historia con sus dimensiones y texto alternativo.

| Bloque | Resultado |
| --- | --- |
| Inicio y Drilo | Composición de fase 3, con desplazamiento leve de ondas y vegetación ligado al scroll. |
| Historia | Cauce propio y tres momentos siempre legibles; escena retenida solo desde 1024 px de ancho y 672 px de alto, con movimiento permitido. |
| Propósito | Papel amarillo, dos columnas en escritorio y preguntas abiertas con separadores de lectura. |
| Compra | Orilla clara, reserva cuadrada de portada, ficha específica de ITA y acceso directo a la tienda. |
| Pie | Fondo verde, despedida y segundo control de movimiento sincronizado. |
| Interior y Autora | Estilos coherentes preparados; siguen desactivados por falta de materiales y aprobación. |

Se conservan todos los textos, las cinco secciones activas, el orden editable, el título provisional, ITA como única tienda, los pendientes y `noindex`. No se añaden fechas, precios, stock, Amazon, retratos ni interiores. No hay originales nuevos disponibles que integrar. Las reservas siguen explícitas; no equivalen a la aprobación gráfica final.

## Movimiento y adaptación

La base estática no depende de JavaScript. `motion.css` activa el movimiento únicamente si el navegador reconoce `animation-timeline` y `animation-range` y el sistema permite animaciones. [Referencia técnica de timelines CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).

- La timeline de cada escena desplaza suavemente las ondas y gira las hojas de apoyo.
- La timeline de Historia dibuja el cauce y mueve una hoja por un `offset-path` que comparte la geometría del río.
- En escritorio amplio, la escena usa `position: sticky` mientras pasan los tres momentos; no se intercepta el scroll ni se alteran sus distancias.
- En móvil y ventanas bajas se elimina la retención. Los tres momentos aparecen en secuencia vertical, sin textos ocultos, superpuestos o dependientes de una animación.
- Al desactivar movimiento, desaparecen tanto las animaciones como la retención. El cauce completo y la hoja en la desembocadura forman la alternativa estática.
- `prefers-reduced-motion` siempre prevalece, también si cambia con la página abierta. Los controles muestran el estado del sistema y quedan deshabilitados mientras esa preferencia está activa.
- Cabecera y pie comparten el estado mediante `aria-pressed`. La preferencia se guarda en `localStorage` si está disponible; bloquear el almacenamiento no impide usar los controles durante la sesión.
- Sin JavaScript, los controles permanecen ocultos y se puede leer, navegar y consultar ITA. CSS sigue respetando movimiento reducido. Sin soporte de timelines, se conserva la composición estática.

No se incorporan dependencias ni peticiones externas para las animaciones. El script se limita a preferencias y controles; no mide posiciones durante el scroll. La declaración de timeline se conserva separada de la abreviatura de animación para evitar que el minificador produzca sintaxis incompatible con navegadores que ya soportan timelines.

## Edición y alcance pendiente

`src/content/landing.ts` continúa siendo la fuente editorial; `controls.reducedMotion` añade la etiqueta para la preferencia del sistema. Las intensidades se ajustan en los keyframes de `src/styles/motion.css`, las medidas y colores en `landing.css`, y la geometría de Historia en `RiverJourney.astro` y su `offset-path` correspondiente.

Se aplicaron las skills proporcionadas `frontend-design`, `webapp-testing` y `scroll-animations`, además del flujo local de Sites. `scroll-animations` contiene únicamente un formato de respuesta, por lo que el comportamiento se implementó en el proyecto. Se eligió CSS progresivo frente al GSAP propuesto inicialmente porque esta entrega solo necesita animar escenografía y no una coreografía de poses del personaje.

La fase 5 completará el viaje de Drilo cuando existan las ilustraciones autorizadas y los títulos interactivos con su explicación accesible. La galería manual requiere interiores autorizados. La revisión editorial, los metadatos de publicación, las tiendas y la validación final siguen pendientes. Las animaciones no implican aprobación para lanzar.

## Verificación

- `npm run check`: 0 errores y 0 advertencias; ocho sugerencias existentes del submódulo de skills.
- `npm run build`: generación estática correcta. Pruebas sobre esa compilación, no solo sobre el servidor de desarrollo.
- Edge sin interfaz con Playwright: anchos de 320, 390, 768, 1024 y 1440 px, sin desbordamiento horizontal; ventana de 1024 × 600 sin retención.
- Comprobación del avance real de `offset-distance` y `stroke-dashoffset` al desplazar la página; controles sincronizados, persistencia al recargar y actualización al cambiar movimiento reducido.
- Navegación con teclado: enlace de salto enfoca `main`; compra conduce a `#libro`; todos los destinos internos existen.
- Lectura y compra sin JavaScript, un único `h1`, cinco secciones activas, `noindex` presente y ausencia de errores de página.
- Revisión visual de capturas de [escritorio](design/previews/fase4-escritorio.jpg), [móvil](design/previews/fase4-movil.jpg) e [Historia](design/previews/fase4-historia.jpg). Son evidencia de desarrollo y no se publican como recursos de la web.

La fase 3 aún no estaba en `origin/develop` al iniciar. La rama de fase 4 nace de `origin/develop` actualizado e incorpora la rama de fase 3 mediante merge para conservar su historial y diseño. La PR señala esa dependencia.
