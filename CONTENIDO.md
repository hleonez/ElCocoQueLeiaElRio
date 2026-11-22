# Contenido de la landing de Drilo

Entrega de la fase **Contenido** de [PLAN-LANDING.md](PLAN-LANDING.md). Revisión de fuentes: **22 de noviembre de 2026**.

Esta fase reúne el inventario, los borradores y los pendientes necesarios para comenzar el wireframe. Completarla no equivale a aprobar los textos para publicación. La página técnica sigue en preparación y conserva `noindex`.

## Objetivo, público y voz

Despertar interés por Drilo y facilitar la consulta del libro en las tiendas confirmadas. El recorrido editorial es: conocer al personaje, descubrir el conflicto, acercarse al libro, conversar sobre su propósito y encontrar dónde conseguirlo.

Hablamos a familias, personas que regalan cuentos y docentes; los niños podrán explorar la página acompañados. Usar frases claras, tono cálido y preguntas que inviten a escuchar. Evitar comparaciones entre niños, promesas de resultados educativos, diagnósticos o afirmaciones de que una animación reproduce la dislexia. Los juegos de letras tendrán su explicación cerca de la primera interacción.

Los textos de `src/content/landing.ts` son borradores originales para la landing. No son citas ni fragmentos autorizados del libro. La sinopsis no cuenta el desenlace. Las preguntas del propósito son propuestas para conversar, no actividades extraídas del cuento.

## Fuentes y alcance de la revisión

| Fuente | Qué permite documentar | Límite |
| --- | --- | --- |
| [Plan del proyecto](PLAN-LANDING.md) | Objetivo, tono, recorrido, título provisional y decisiones sobre materiales faltantes | Las imágenes y la publicación mencionadas en el plan no están adjuntas en este checkout |
| [Ficha de ITA](https://itabooks.com/producto/el-coco-que-leia-en-el-rio/) | Autoría, conflicto del cuento y ficha de su edición impresa | Se pudo consultar el resultado indexado del dominio editorial; la apertura directa falló. Revisar manualmente el enlace y el estado comercial antes de publicar |
| [Presentación de Alianza Francesa Barranquilla](https://barranquilla.alianzafrancesa.edu.co/cultura/lectura-infantil-y-exposicion-el-coco-que-leia-el-rio/) | Nombre completo, procedencia y trayectoria creativa para el borrador de biografía | Es una presentación de un evento pasado; no confirma la situación académica actual ni autoriza imágenes o su reproducción |

**Documentado** significa respaldado por el plan o una fuente identificada; **borrador** requiere revisión editorial; **pendiente** no cuenta con confirmación o recurso suficiente. Ninguno de estos estados implica autorización de imágenes.

## Inventario de datos

| Campo | Estado | Tratamiento |
| --- | --- | --- |
| Título | Pendiente | Conservar provisionalmente «El coco que leía el río». ITA añade «en»; Alianza Francesa usa la variante del plan. Laura debe confirmar el título de la landing y su correspondencia con cada edición |
| Personaje y conflicto | Documentado | Drilo tiene dificultades con las señales del río; la abuela lo acompaña. Adaptación editorial en `book.synopsis` |
| Autoría | Documentado | Laura Londoño; el nombre completo se usa solo en el borrador biográfico |
| Ficha ITA | Documentado | `book.editions` contiene la ficha física asociada a `ita-impresa`. No extrapolarla a Amazon |
| Sinopsis, presentación y propósito | Borrador | Revisar los textos de `landingContent.sections` con Laura antes del lanzamiento |
| Biografía | Borrador | Adaptación breve de Alianza Francesa, sin asumir estudios terminados ni situación actual. Módulo desactivado |
| Enlace ITA | Documentado | Incorporado como «Consultar en ITA»; falta comprobar navegación y producto manualmente |
| Enlace Amazon y su edición | Pendiente | No se identificó una URL oficial confirmada. No crear botones vacíos, enlaces de búsqueda ni trasladar ISBN de terceros |
| Venta o preventa | Pendiente | La ficha indexada menciona preventa; confirmar vigencia con ITA. Mantener «Encuentra el libro» como llamada general |
| Lanzamiento | Pendiente | El plan menciona 14 de noviembre sin año. Omitir fecha y cuenta regresiva |
| Precio, stock y envío | Pendiente de consulta en tienda | No duplicar cifras o plazos cambiantes en la landing |
| ISBN y fecha de edición | Pendiente | Omitidos. Verificar por edición con la fuente correspondiente |
| Retrato y perfiles de Laura | Pendiente | Sin foto ni URLs inventadas. `author.links` está vacío |
| Derechos y créditos de ilustraciones | Pendiente | Solicitar atribución y permiso de uso web; `footer.rightsNotice` se omite |
| Tiendas físicas | Pendiente | Arreglo vacío; no hay direcciones verificadas |
| Metadatos | Borrador | Título y descripción preparados; dominio e imagen social pendientes. Conservar `noindex` |

## Borradores y visibilidad por bloque

La fuente editable de los textos es [src/content/landing.ts](src/content/landing.ts). Esta tabla describe su uso, sin mantener una segunda copia de cada párrafo.

| Bloque / ID | Contenido preparado | Uso previsto |
| --- | --- | --- |
| Cabecera | Título desde `book.title`; etiquetas desde `navigationLabel` de las secciones habilitadas | Ocultar en el menú los destinos desactivados |
| Primera pantalla / `inicio` | Título, presentación, «Encuentra el libro» y «Conoce a Drilo» | Habilitado para el wireframe; primera acción lleva a `libro`, segunda a `drilo` |
| Personaje / `drilo` | Presentación de su dificultad sin anticipar la resolución | Habilitado |
| Historia / `historia` | Sinopsis y tres momentos: dificultad, acompañamiento y pregunta abierta | Habilitado. La composición decidirá entre sinopsis o momentos para evitar repetir la misma información |
| Interior / `interior` | Encabezado e introducción de la galería | Desactivado hasta disponer de interiores autorizados |
| Propósito / `proposito` | Mensaje sobre empatía y tres preguntas para conversar | Habilitado |
| Autora / `autora` | Encabezado y biografía breve | Desactivado hasta revisar la biografía; puede habilitarse solo con texto si se aprueba |
| Compra / `libro` | Cierre, aviso para consultar condiciones en tienda y enlace ITA | Habilitado, sin prometer stock ni entregas |
| Pie / `pie` | Despedida, crédito textual de autoría y edición | Habilitado; derechos y redes se incorporarán cuando se confirmen |

`enabled` expresa la visibilidad en la interfaz, no la aprobación para publicar. La propuesta visual de `index.astro` renderiza las secciones habilitadas y genera la navegación con esos mismos destinos. Las etiquetas del control de movimiento y del juego de letras ya están centralizadas en `controls`; su comportamiento corresponde a la fase Animación.

## Inventario de materiales

Solo hay archivos `.gitkeep` en las carpetas de imágenes y originales. No se recibieron recursos utilizables en el repositorio. Los nombres siguientes son **destinos sugeridos**, no archivos existentes ni rutas activas en los datos.

La fase [Diseño visual](DISENO-VISUAL.md) añade formas de apoyo de río, orillas y hojas como SVG decorativo en `RiverScene.astro`. No representan a Drilo ni sustituyen originales autorizados. Los colores son una propuesta pendiente de contrastar con los materiales. Las fuentes usan pilas locales, sin archivos redistribuidos. Las secciones Inicio y Drilo admiten el campo opcional `illustration` con ruta, texto alternativo y dimensiones reales; permanece sin completar hasta recibir los recursos.

| Recurso | Prioridad y uso | Entrega necesaria / destino sugerido | Alternativa provisional |
| --- | --- | --- | --- |
| Portada | Alta; primera pantalla y compra | Original y exportación web autorizada en `src/assets/images/portada.webp` | Reservar espacio en wireframe; `book.cover` se omite |
| Drilo recortado | Alta para recorrido y animación | PNG/WebP transparente, proporciones y diseño originales; `src/assets/images/drilo.webp` | Usar la portada cuando llegue; no redibujar poses automáticamente |
| Río, orillas y hojas | Media; escenas y transiciones | Capas separadas, SVG o imágenes transparentes en `src/assets/images/` | Formas sencillas reemplazables en la fase visual |
| Dos o tres interiores | Media; galería | Archivos autorizados con orden, pie y crédito; `src/assets/images/interior-01.webp` y siguientes | `gallery: []`, sección desactivada |
| Retrato de Laura | Media; autora | Foto o ilustración con permiso y crédito; `src/assets/images/laura-londono.webp` | Omitir imagen; no bloquear una biografía aprobada por falta de retrato |
| Logotipo ITA | Media; créditos | Exportación y condiciones de uso | Nombre editorial como texto |
| Imagen social | Antes de indexar; compartir | Composición aprobada con título confirmado y portada autorizada | Omitir `seo.socialImage` y mantener `noindex` |
| Fuentes web | Fase visual | WOFF2 con licencia de uso en `public/fonts/` | Fuente de sistema en wireframe |

Para cada archivo registrar origen, titular, permiso de uso web, crédito, dimensiones reales y texto alternativo. En la portada describir título y autoría visibles; en Drilo y los interiores describir únicamente lo que se vea al recibir el archivo. Los elementos decorativos usarán `alt=""`. No escribir descripciones de ilustraciones que todavía no se han visto.

Los originales editables van en `design/originals/`; las imágenes web en `src/assets/images/`. Usar `public/graphics/` solo para recursos que deban copiarse sin procesar. No descargar imágenes de tiendas como sustituto de una autorización.

## Cómo editar y continuar

1. Editar libro, autora, textos y enlaces en `src/content/landing.ts`, usando los contratos de `src/content/types.ts`. Título, biografía y sinopsis se reutilizan desde sus objetos; no duplicarlos en componentes.
2. Mantener los IDs de las secciones. Reordenar `sections` para cambiar el recorrido; cambiar `enabled` para ocultar un bloque. La futura navegación debe filtrar secciones desactivadas antes de generar enlaces.
3. Añadir únicamente URLs confirmadas a `purchaseLinks`, `author.links` o `footer.links`. Asociar la compra con su edición mediante `editionId`. Amazon se añadirá cuando se confirme su enlace y su ficha.
4. Al recibir interiores, completar `gallery` con ruta real, dimensiones, texto alternativo, pie y crédito antes de activar `interior`. Documentar por separado si todavía están pendientes de autorización.
5. Actualizar este inventario al resolver pendientes. Ejecutar `npm run check` y `npm run build` después de cambiar datos o tipos.

La fase Wireframe utiliza estos borradores y reservas de imagen; sus decisiones y su contraste con esta entrega están en [WIREFRAME.md](WIREFRAME.md). Antes de publicar faltan confirmar título y edición, revisar los textos con Laura, comprobar las tiendas, obtener recursos y derechos, preparar dominio e imagen social, y completar las fases restantes del plan.
