# Diseño visual de la landing de Drilo

## Paleta y tipografías del libro · 24 de noviembre de 2026

Esta actualización sustituye la paleta y las fuentes provisionales de la fase 3 descritas más abajo.

- Fondo crema: `#faf3dc` (`--paper`).
- Verde de guardas: `#bcceb9` (`--guard`), aplicado a Historia, Autora y el pie, además de elementos del río.
- Café de texto: `#381c13` (`--ink`), aproximación sRGB de C27 M64 Y75 K70 mediante R=255(1-C)(1-K), y equivalentes para G y B. No se proporcionó un perfil ICC; no representa una conversión colorimétrica exacta del impreso. Los dos colores que tienen HEX usan ese valor como referencia de pantalla.
- OpenDyslexic Regular y Bold para títulos, cuerpo, navegación, preguntas, citas y controles. Se quitaron el espaciado negativo y las alturas de línea estrechas de la tipografía anterior. Preload de ambas variantes y `font-display: swap`.
- Poppins Light (300) para créditos y avisos legales. Poppins Italic (400) se configura para los avisos en cursiva. No hay un bloque de agradecimientos en la landing actual; no se inventa contenido para mostrar la fuente.
- Fuentes alojadas localmente: `public/fonts/opendyslexic/` y `public/fonts/poppins/`. No hay solicitudes a Google Fonts en tiempo de lectura.

OpenDyslexic procede del ZIP `opendyslexic-0.92.zip` proporcionado por el usuario. Se copiaron únicamente Regular y Bold, sin alterar sus archivos OTF; `OFL.txt` conserva la licencia embebida en la fuente. Poppins Light, Italic y su licencia proceden del [repositorio oficial de Google Fonts](https://github.com/google/fonts/tree/main/ofl/poppins); se conservan los TTF originales y `OFL.txt`.

Validación: `npm run check` y `npm run build` correctos (sin errores ni advertencias, con las ocho sugerencias previas del submódulo). Se comprobó la presencia de tildes, ñ, signos de apertura y elipsis en las cuatro fuentes. Contraste de café sobre crema: 14.08:1; sobre verde: 9.43:1. Navegador revisado a 320, 390, 827 y 1440 px sin desbordamiento horizontal; estilos computados confirman OpenDyslexic en cuerpo y título, Poppins en créditos, y los nuevos colores. Inspección visual de primera pantalla y sección Autora. Las capturas históricas de fases anteriores no reflejan esta paleta.

## Ajustes de revisión · 24 de noviembre de 2026

- Se retira la barra de revisión. La cabecera usa el verde del libro con texto café (contraste 9.43:1); el botón café mantiene texto crema (14.08:1).
- La sección Autora reserva un retrato a la izquierda y conserva nombre, rol, biografía e Instagram `https://www.instagram.com/millunaress__/` a la derecha. En móvil se apilan. Se retira la nota «Un sueño que tomó forma de cuento».
- La introducción de compra sube y su fondo crece con el contenido. La curva utiliza un radio vertical de 3rem y un espacio inferior de 4rem para dejar el texto sobre verde con independencia del ancho y del número de líneas.
- Se retiran los controles globales de movimiento; ver ANIMACIONES.md.

## Registro de la propuesta inicial de fase 3

Fase 3 de [PLAN-LANDING.md](PLAN-LANDING.md), preparada el **22 de noviembre de 2026**. La propuesta se puede recorrer en `/` con `npm run dev`. Fija el lenguaje de la primera pantalla y de **Conoce a Drilo**; las demás secciones conservan la composición del wireframe con los estilos comunes de lectura. La versión estática completa y las animaciones siguen siendo fases posteriores.

## Dirección y decisiones antes de implementar

El río organiza la composición: una primera pantalla de papel amarillo se encuentra con una escena de orillas curvas, y el personaje vuelve a tener un espacio propio en la sección siguiente. El texto se alinea a la izquierda; la ilustración tiene aproximadamente la mitad del ancho de escritorio. En móvil, título, presentación y compra preceden a la escena.

```text
Escritorio                         Móvil
identidad          historia compra identidad
                                   historia compra
título grande    escena del río    título y presentación
autoría          reserva de Drilo  acciones
presentación     portada pequeña   escena y portada
acciones
                                   Conoce a Drilo
escena de Drilo   Conoce a Drilo    texto
                 texto            escena de Drilo
```

La revisión del brief descarta tarjetas repetidas, ilustraciones inventadas y efectos de entrada. El gesto distintivo se concentra en las orillas y en el título de lectura amplia. El amarillo responde al papel y a la luz descritos en el plan; no se añade una textura que entorpezca los párrafos.

### Variables visuales

| Variable | Valor | Función |
| --- | --- | --- |
| `--ink` | `#203b32` | Texto y trazos legibles |
| `--forest` | `#244e3b` | Acciones principales y títulos |
| `--paper` | `#fff4c9` | Luz y fondo de la primera pantalla |
| `--river` | `#b6deda` | Agua y transición entre escenas |
| `--reed` | `#739044` | Vegetación decorativa, nunca texto |
| `--scarf` | `#a83f35` | Acento pequeño y foco accesible |

Los valores son **propuestos**, no colores extraídos de originales: esos recursos aún no están en el repositorio. Superficies blancas y tintas derivadas completan el sistema en `src/styles/landing.css`.

**Tipografía:** Georgia en títulos, con su alternativa serif; Trebuchet MS en navegación y párrafos, con alternativas sans serif. Son pilas locales, sin descargas ni archivos de fuente redistribuidos. Georgia da al título un carácter de cuento impreso; el cuerpo abierto y el interlineado amplio sostienen la lectura. El cuerpo parte de `1rem`, los textos auxiliares de `0.875rem`; los títulos escalan con `clamp()`. Las fuentes definitivas con licencia web pueden reemplazar estas dos variables.

**Medidas:** contenedor de 72rem, márgenes fluidos, párrafos de hasta 62 caracteres y dos columnas desde 48rem. Botones con altura mínima de 48px, enlaces de navegación de 44px y foco visible. Sin scroll retenido, carruseles, alteraciones de letras ni controles de animación vacíos.

## Recursos y continuidad editorial

No hay portada ni ilustraciones autorizadas disponibles. `RiverScene.astro` dibuja únicamente formas de agua, orillas y hojas mediante SVG decorativo, sin representar a Drilo. Las reservas están rotuladas como material original pendiente. No son ilustraciones finales ni una recreación del personaje. La portada mantiene su reserva secundaria y `book.cover` sigue ausente.

Para integrar las ilustraciones, completar `illustration` en la sección correspondiente de `src/content/landing.ts`, con `src`, `alt`, `width` y `height` reales. El componente reserva la composición y muestra el archivo en lugar del rótulo. La portada se integra mediante `book.cover`, como en la fase 2. Solo añadir archivos autorizados; registrar procedencia y derechos en [CONTENIDO.md](CONTENIDO.md).

Se conservan el título provisional, todos los borradores, el orden y `enabled`, las acciones filtradas por destinos habilitados, ITA como única tienda y la ficha asociada a su edición. Interior y Autora permanecen desactivados. `noindex` continúa activo. No se añaden datos comerciales ni se publica el sitio.

## Edición y siguiente fase

- **Diseño:** `src/styles/landing.css` centraliza colores, fuentes, medidas y adaptación. Sustituye la hoja provisional `wireframe.css`; [WIREFRAME.md](WIREFRAME.md) conserva el registro de la fase anterior.
- **Escenas:** `src/components/RiverScene.astro` contiene las formas reemplazables; cada instancia es independiente y sus SVG no usan identificadores globales.
- **Contenido:** `src/content/landing.ts` mantiene la fuente editorial única. El contrato `SectionIllustration` permite integrar recursos sin editar la composición.
- **Próxima fase:** extender el lenguaje a la landing estática completa, integrar materiales autorizados y resolver la galería manual cuando existan interiores. La fase Animación implementará el recorrido y los controles de movimiento.

## Verificación

- `npm run check`: 0 errores, 0 advertencias; las mismas ocho sugerencias del submódulo de skills que en la fase 2.
- `npm run build`: generación estática correcta de `/index.html`. La salida no contiene scripts: contenido, navegación y compra funcionan sin JavaScript y no incorporan movimiento.
- Revisión visual en navegador a **320, 390, 768 y 1440 px**. Una columna en móvil y dos desde 48rem. Después de corregir el fondo de la cabecera, el ancho del documento coincide con el ancho útil de la ventana en las cuatro medidas, sin desplazamiento horizontal.
- Teclado: «Saltar al contenido» lleva el foco a `main#contenido`; «Encuentra el libro» llega a `#libro`. Todos los destinos de las anclas existen.
- Se conserva un único `h1`, `noindex` y las cinco secciones habilitadas de la fase 2. Interior y Autora no se renderizan. La tienda no se ha revalidado para publicación.
- Contraste calculado: tinta sobre papel **10.98:1**, blanco sobre verde **9.43:1**, autoría roja sobre papel **5.55:1** y texto de las reservas de Drilo **8.15:1**. Las hojas de color son decorativas.
- Capturas de la compilación: [escritorio, primera pantalla y Conoce a Drilo](design/previews/fase3-escritorio.jpg) y [recorrido móvil a 390 px](design/previews/fase3-movil.jpg). Son evidencia de esta entrega; regenerarlas si cambia el diseño. Se guardan fuera de `public/` y no forman parte de la web compilada.
- El servidor de desarrollo que ya estaba abierto volvió a cargar correctamente la hoja nueva. La propuesta queda accesible en `http://localhost:4321/`; el servidor auxiliar de compilación se detuvo al terminar la revisión.

Esta entrega completa la propuesta de diseño de los dos bloques previstos. La fidelidad al personaje y la paleta definitiva requieren los originales; no se confirma su aprobación editorial ni se adelantan las fases de Versión estática, Animación o Validación final.
