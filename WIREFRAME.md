# Wireframe de la landing de Drilo

Entrega de la fase 2, **Wireframe**, de [PLAN-LANDING.md](PLAN-LANDING.md), preparada el **22 de noviembre de 2026**. Se puede recorrer en `/` con `npm run dev`.

La estructura usa los borradores de [CONTENIDO.md](CONTENIDO.md) y [src/content/landing.ts](src/content/landing.ts). El gris, los bordes, la fuente de sistema y las reservas rotuladas permiten revisar tamaños, orden y lectura antes de definir la identidad gráfica. La franja inicial identifica esta vista como una propuesta para revisión.

## Composición por pantalla

| Bloque | Escritorio, desde 48rem | Móvil, por debajo de 48rem |
| --- | --- | --- |
| Cabecera | Identidad a la izquierda; navegación y acceso a compra a la derecha | Identidad y navegación se acomodan en líneas; sin menú que dependa de JavaScript |
| Primera pantalla | Dos columnas de igual ancho: título, autoría, presentación y acciones; escena principal de Drilo con portada secundaria | Texto y acciones antes de la escena; botones apilados en pantallas pequeñas. Drilo conserva una reserva mayor que la portada |
| Conoce a Drilo | Ilustración a la izquierda y texto a la derecha | Texto y después ilustración, según el orden de lectura del documento |
| Historia | Encabezado; debajo, escena y tres momentos en columnas | Encabezado, escena y tres momentos en secuencia vertical; sin retener el scroll |
| Propósito | Texto y preguntas en dos columnas | Texto seguido de preguntas en lista |
| Compra | Introducción; debajo, portada y ficha de la edición con enlace a la tienda | Introducción, portada, ficha y tienda en una columna |
| Pie | Despedida y crédito textual | El mismo contenido con ajuste de línea |

Los anchos usan un contenedor máximo de 72rem, márgenes fluidos y columnas que pueden encogerse. El cuerpo parte del tamaño de fuente del navegador, sin fijarlo por debajo de 16px con la configuración habitual. Las reservas conservan proporciones y tienen etiquetas de texto, sin rutas de imagen inexistentes ni textos alternativos inventados.

Interior y Autora tienen estructura prevista en `LandingSection.astro`, pero no se renderizan mientras `enabled` sea `false`. Al aprobar los materiales, Interior admitirá una cuadrícula de imágenes con dimensiones, pies y créditos; Autora admitirá biografía y enlaces, con retrato opcional. La ampliación manual de galería y el tratamiento visual se completarán en las fases posteriores.

## Contraste con la fase Contenido

| Decisión anterior | Aplicación en el wireframe |
| --- | --- |
| Una sola fuente editable y contratos TypeScript | Los componentes reciben `landingContent`; no se alteraron los contratos ni se duplicaron párrafos o URLs de tiendas |
| Orden y visibilidad en `sections` | La página recorre el arreglo filtrando `enabled`; cabecera y acciones usan los mismos destinos habilitados |
| Evitar repetir sinopsis y tres momentos | Historia muestra los tres momentos; conserva la sinopsis en los datos para otros usos y como alternativa si no hay momentos |
| Interior y Autora desactivados | No aparecen en el recorrido ni en el menú. La biografía continúa pendiente de revisión |
| Drilo protagonista sin redibujarlo | Reserva principal amplia para Drilo y el río, con portada secundaria. No se generaron ilustraciones ni poses |
| Edición ITA identificada; Amazon pendiente | Solo se muestra la tienda preparada. La ficha física se asocia a una edición enlazada mediante `editionId` |
| Sin precios, fechas ni stock confirmados | Se conserva el aviso de consulta en tienda, sin añadir valores ni promesas |
| Textos y recursos sujetos a aprobación | Se conserva `noindex`; esta entrega es local y no publica el sitio |
| Controles y efectos para Animación | No se muestran controles inoperantes; esta estructura no requiere JavaScript ni movimiento |

## Edición y continuidad

- **Texto, orden y visibilidad:** editar `src/content/landing.ts`. Mantener los IDs estables. Cambiar `enabled` oculta tanto el bloque como sus enlaces internos. Si se oculta Inicio, la página conserva un título principal de respaldo.
- **Nuevas imágenes:** completar solo rutas reales y autorizadas. `book.cover` reemplaza las dos reservas de portada. Las ilustraciones de Drilo siguen siendo reservas hasta integrar los archivos en la fase visual.
- **Interior y Autora:** completar los recursos y revisar los textos según `CONTENIDO.md` antes de habilitar sus módulos. Una biografía aprobada puede mostrarse sin retrato.
- **Distribución:** `src/styles/wireframe.css` contiene las medidas provisionales y los cortes responsive. `LandingLayout.astro` contiene idioma, metadatos, franja de borrador y enlace para saltar al contenido.
- **Interacciones:** los enlaces internos son anclas nativas; los externos navegan en la misma pestaña. No hay acciones vacías ni controles simulados. La galería ampliable y los controles de movimiento corresponden a etapas posteriores.

## Verificación de la entrega

- `npm run check`: sin errores ni advertencias; ocho sugerencias en archivos del submódulo de skills, fuera del código de la landing.
- `npm run build`: generación estática correcta de `/index.html`.
- Vista local: respuesta HTTP 200; revisión en navegador a 320, 390, 768 y 1440 px. Una columna en móvil y dos desde 48rem, sin desbordamiento horizontal.
- Navegación: todos los destinos de anclas existen; «Encuentra el libro» llega a `#libro`. El enlace de salto activa el foco de `main#contenido` con teclado.
- Coherencia: solo se renderizan `inicio`, `drilo`, `historia`, `proposito` y `libro`; un único título principal y `noindex` presente. Los datos y enlaces externos mantienen el estado editorial de la fase anterior; no se revalidó la tienda para publicación.

La fase siguiente es **Diseño visual**: fijar la primera pantalla y una sección interior con paleta, tipografías e ilustraciones autorizadas. La versión estática completa y las animaciones conservan sus casillas pendientes.
