# Landing del libro

Landing con Astro, TypeScript estricto y generación estática. Están preparadas las fases Contenido y Wireframe: inventario editorial, borradores y estructura responsive con espacios reservados para imágenes. Todavía no incluye el diseño visual final, animaciones ni servicios externos. El nombre del paquete es un identificador técnico, no confirma el título del libro.

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
  pages/           Rutas; index.astro compone el wireframe desde el contenido
  layouts/         Estructuras compartidas de página
  components/      Cabecera, secciones, pie y reservas de imagen
  content/         Contratos y contenido editorial centralizado
  styles/          wireframe.css: jerarquía y distribución responsive provisional
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

`src/content/types.ts` define los contratos `Book`, `BookEdition`, `Author`, `ExternalLink`, `PurchaseLink`, `PhysicalStore`, `LandingSection`, `GalleryImage` y `LandingContent`. Los objetos están tipados para comprobar su estructura. Los componentes reciben estos datos mediante propiedades; evitar textos y URLs comerciales repartidos por los componentes.

El título es provisional. Los datos físicos están asociados únicamente a la edición de ITA. Portada, retrato, derechos, Amazon e imagen social siguen pendientes: se omiten los campos o se usan arreglos vacíos, sin rutas ni enlaces ficticios. Interiores y autora están desactivados. El menú excluye secciones con `enabled: false`; las acciones internas también omiten destinos desactivados.

No se incluyen datos de ejemplo ni testimonios ficticios. No hace falta CMS ni base de datos para mantener estos archivos. Los tipos comprueban la estructura durante el desarrollo; no validan la existencia de enlaces ni datos externos.

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

## Wireframe y siguiente fase

El wireframe móvil y de escritorio se sirve en `/` con `npm run dev`. Usa fuente de sistema, escala de grises y reservas de imagen con etiquetas; no representa el diseño visual definitivo. La composición, la comparación con Contenido y las instrucciones de edición están en [WIREFRAME.md](WIREFRAME.md). El avance de las etapas se registra en [PLAN-LANDING.md](PLAN-LANDING.md).

La siguiente fase es **Diseño visual**: definir la primera pantalla y una sección interior usando materiales autorizados. El wireframe consume `landingContent`, conserva su `noindex` y funciona sin JavaScript. Antes del lanzamiento habrá que confirmar los pendientes editoriales y configurar dominio, metadatos, recursos sociales y sitemap antes de retirar `noindex`.

No hay hosting, integraciones, analítica, backend ni configuración de despliegue en esta base.
