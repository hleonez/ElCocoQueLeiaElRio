# Landing del libro

La versión actual convierte la página en un recorrido por el río: entrada luminosa, paisaje por capas, señales entre juncos, pausa bajo el manglar y llegada al libro. Decisiones, archivos y validación en [RECORRIDO-RIO.md](RECORRIDO-RIO.md). Los textos de las escenas se editan en `src/content/journey.ts`; libro, autora y enlaces permanecen en `src/content/landing.ts`. `npm test` ejecuta las regresiones de la interacción y el seguimiento de escenas.

Landing con Astro, TypeScript estricto y generación estática. Están preparadas las fases Contenido, Wireframe, Diseño visual, Versión estática y Animación con los recursos disponibles: recorrido responsive, título interactivo y escenas vinculadas al scroll. Las ilustraciones originales siguen pendientes. El nombre del paquete es un identificador técnico, no confirma el título del libro.

## Requisitos e inicio

Usar Node.js 24 LTS y npm. El archivo `package-lock.json` fija las versiones de las dependencias.

```sh
npm ci
npm run dev
```

Abrir la dirección local que muestra Astro en la terminal. Para permitir acceso desde otro dispositivo de la red local, usar `npm run dev -- --host`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo local con recarga automática |
| `npm run check` | Validar archivos Astro y tipos TypeScript |
| `npm run build` | Generar el sitio estático en `dist/` |
| `npm run preview` | Servir localmente la compilación de `dist/` |

Antes de entregar cambios, ejecutar `npm run check` y `npm run build`. `preview` requiere una compilación previa y no es un servidor de producción.

## Organización

```text
src/
  pages/           Rutas; index.astro compone la landing desde el contenido
  layouts/         Estructuras compartidas de página
  components/      Cabecera, secciones, pie, escenas y reservas de imagen
  content/         Contratos y contenido editorial centralizado
  styles/          landing.css: variables visuales, lectura y distribución responsive
  assets/images/   Imágenes que Astro procesará al integrarlas
public/
  fonts/           Fuentes web con licencia
  graphics/        Recursos públicos que se servirán sin transformación
design/
  originals/       Materiales fuente de diseño, fuera del sitio publicado
```

Los archivos `.gitkeep` conservan carpetas vacías y pueden retirarse al añadir contenido. `node_modules/`, `.astro/` y `dist/` son generados y no se versionan.

## Contenido

El inventario, las fuentes, el estado de los datos y los materiales pendientes están en [CONTENIDO.md](CONTENIDO.md). La fuente editable de los textos es [src/content/landing.ts](src/content/landing.ts): exporta `book`, `author` y `landingContent`, con las secciones ordenadas, su visibilidad, los enlaces de compra y los metadatos en borrador.

`src/content/types.ts` define los contratos `Book`, `BookEdition`, `Author`, `ExternalLink`, `PurchaseLink`, `PhysicalStore`, `LandingSection`, `SectionIllustration`, `GalleryImage` y `LandingContent`. Los objetos están tipados para comprobar su estructura. Los componentes reciben estos datos mediante propiedades; evitar textos y URLs comerciales repartidos por los componentes.

El título está confirmado en el original compartido en Drive. La biografía y los textos se adaptaron de los archivos de la autora (ver CONTENIDO.md). Los datos físicos están asociados únicamente a la edición de ITA. Portada, retrato, derechos, Amazon e imagen social siguen pendientes: se omiten los campos o se usan arreglos vacíos, sin rutas ni enlaces ficticios. La sección Autora está habilitada sin retrato; Interiores sigue desactivada. El menú excluye secciones con `enabled: false`; las acciones internas también omiten destinos desactivados.

No se incluyen datos de ejemplo ni testimonios ficticios. No hace falta CMS ni base de datos para mantener estos archivos. Los tipos comprueban la estructura durante el desarrollo; no validan la existencia de enlaces ni datos externos.

## Fuentes y paleta

OpenDyslexic Regular y Bold es la fuente principal de toda la landing. Poppins Light e Italic se reservan a créditos y avisos legales. Las fuentes y sus licencias están en `public/fonts/`, servidas desde el propio sitio. Colores: crema `#faf3dc`, verde de guardas `#bcceb9` y café `#381c13` (aproximación del CMYK facilitado). La procedencia, distribución y verificación se documentan en [DISENO-VISUAL.md](DISENO-VISUAL.md).

## Entrega de la diseñadora

Antes de desarrollar las secciones, reunir:

- Brief: título confirmado, autora, público, temática, tono y objetivo de la página.
- Enlace de Figma con vistas móvil y escritorio, componentes y notas de adaptación.
- Colores, jerarquías, espaciado y tipografías con licencia web; preferir WOFF2.
- Portada y fotografías originales de buena calidad.
- Ilustraciones SVG o imágenes con transparencia, fondos y texturas exportados por separado.
- Sinopsis, biografía, fragmentos autorizados y enlaces de compra confirmados.
- Inventario con nombre de archivo, uso previsto, autoría, licencia y texto alternativo.

Guardar fuentes editables en `design/originals/`; no guardar allí datos sensibles. Esta carpeta no forma parte de la salida estática, pero sus archivos sí se versionarán si se añaden a Git. Evitar originales pesados en Git: conservarlos en el espacio de diseño y documentar su enlace cuando corresponda.

Colocar las imágenes web en `src/assets/images/` para integrarlas más adelante con las herramientas de imágenes de Astro. Reservar `public/` para archivos que deban copiarse sin procesamiento: todo lo colocado allí será público en una futura publicación. Nombrar archivos en minúsculas y con guiones.

## Diseño visual y siguiente fase

La propuesta visual móvil y de escritorio se sirve en `/` con `npm run dev`. La primera pantalla y «Conoce a Drilo» definen paleta, tipografía y orillas curvas; la fase 4 las extiende a todo el recorrido. La dirección original y sus variables se documentan en [DISENO-VISUAL.md](DISENO-VISUAL.md). [WIREFRAME.md](WIREFRAME.md) conserva el registro de la fase 2. El avance se registra en [PLAN-LANDING.md](PLAN-LANDING.md).

Los estilos se editan en `src/styles/landing.css`. Las fuentes son pilas locales Georgia y Trebuchet MS con alternativas, sin descargas externas. `RiverScene.astro` contiene formas SVG decorativas de apoyo; no recrea a Drilo. Para reemplazar su reserva, añadir `illustration: { src, alt, width, height }` a Inicio o Drilo en `src/content/landing.ts`, con un archivo autorizado y sus dimensiones reales. `book.cover` reemplaza las reservas de portada.

La fase **Versión estática** extiende el lenguaje visual al recorrido completo. [VERSION-ESTATICA.md](VERSION-ESTATICA.md) documenta la entrega, los controles y la verificación. Historia contiene un río decorativo cuya hoja y trazo avanzan con el scroll; en escritorio amplio la escena permanece visible durante los tres momentos. Los textos nunca se ocultan. En móvil, ventanas bajas, movimiento reducido o animaciones desactivadas, la escena sigue el flujo normal.

La fase **Animación** añade una onda al pasar el puntero por el título principal y un botón «Animar el título» para teclado y toque. Las palabras del título derivan al recorrer la primera pantalla; el resto de los textos permanece estático. El scroll también mueve las capas del río y la portada, dibuja el avance de Historia y acompaña la llegada a compra y al pie. El detalle y las pruebas están en [ANIMACIONES.md](ANIMACIONES.md).

`src/styles/motion.css` contiene las timelines CSS, sin GSAP ni listeners de scroll. `src/scripts/motion.ts` sincroniza los controles y guarda la preferencia local; `title-motion.ts` gestiona la onda con Web Animations API. Sin soporte de timelines, el recorrido conserva su composición estática y el juego manual del título puede funcionar de forma independiente. Sin JavaScript se ocultan los controles y se puede leer, navegar y consultar ITA. Movimiento reducido y el control general cancelan todos los efectos.

La siguiente fase es **Validación**. Antes del lanzamiento habrá que integrar los originales autorizados, confirmar los pendientes editoriales y configurar dominio, metadatos, recursos sociales y sitemap antes de retirar `noindex`.

La prueba de regresión de movimiento está en `scripts/verify-motion.py`. Requiere Python, Playwright y Edge instalado; ejecutarla contra la compilación servida localmente. Las dependencias de prueba no forman parte de la web:

```sh
python -m pip install playwright
python scripts/verify-motion.py --url http://localhost:4324
```

El servidor de prueba puede iniciarse, después de `npm run build`, con `python -m http.server 4324 --bind 127.0.0.1 --directory dist`. Las capturas se guardan en `.qa/fase5/`; `--screenshots` permite elegir otro destino. Las pruebas comprueban interacciones, reversibilidad del scroll, preferencias, lectura sin JavaScript y distribución responsive.

No hay hosting, integraciones, analítica, backend ni configuración de despliegue en esta base.

## Rendimiento del recorrido

La landing utiliza imágenes WebP con variantes de 640/1280 px para la autora y 480/960 px para la portada, `srcset`, dimensiones explícitas y decodificación asíncrona. Las variantes mayores suman 686 KB frente a los 10,1 MB originales. Los originales se conservan en `public/images/`, pero la página carga los derivados de `public/images/optimized/`. Regenerarlos con `node scripts/optimize-images.mjs` después de instalar las dependencias del proyecto. La foto se orienta según sus metadatos antes de redimensionar; conservar su encuadre visual y el escalado existente al sustituirla.

Las cuatro fuentes se sirven en WOFF2 y conservan todos sus caracteres y licencias. Los OTF/TTF originales permanecen junto a las licencias. Para regenerar los derivados, instalar `fonttools` y `brotli` en el entorno de herramientas y ejecutar `python scripts/optimize-fonts.py`.

Un observador activa las animaciones de paisaje únicamente cerca de la ventana. En móvil permanecen estáticos los paisajes grandes; continúan los gestos pequeños y las interacciones. El trazo del río ya no se redibuja durante el scroll y el color de la orilla cambia sin una interpolación continua. Los cambios de escena se resuelven una vez por entrega del observador y evitan escrituras de estado repetidas. No se intercepta el scroll ni se fuerzan capas con `will-change`.

Comparación orientativa en el navegador integrado, con copias compiladas e idéntico medidor temporal: recorrido rápido mediante Page Down, Home, desplazamientos largos y End. En las primeras 62 muestras, antes: p95 de 33 ms, máximo de 67 ms y un intervalo superior a 50 ms; después: p95 de 17 ms, máximo de 22 ms y ninguno superior a 50 ms. Son intervalos entre `requestAnimationFrame` durante el scroll, no una traza del renderizador ni una garantía para otros equipos. El medidor y las copias están en `.qa/`, fuera de la entrega. Validar también con un teléfono físico y caché vacía antes del lanzamiento.
