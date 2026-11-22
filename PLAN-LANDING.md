Propongo una landing que se sienta como **un recorrido por el río de Drilo**: primero conocemos al cocodrilo, después descubrimos su historia y terminamos encontrando el libro. La estructura será modular para cambiar textos, imágenes, secciones y animaciones sin rediseñarla por completo.

La skill `scroll-animations` ya está instalada mediante el comando solicitado y estará disponible en el próximo turno. El instalador la añadió a siete agentes, incluido Codex. Revisé su contenido: solo incluye una plantilla de respuesta, así que las animaciones necesitarán una implementación propia.

**1. Objetivo y público**

El objetivo principal será despertar interés por Drilo y llevar al visitante a consultar el libro en ITA o Amazon.

La página hablará principalmente a familias, personas que regalan cuentos y docentes. Mantendrá una apariencia ilustrada y cercana que también invite a los niños a explorarla acompañados.

La secuencia narrativa será:

**Conocer a Drilo → descubrir su historia → explorar el libro → conectar con su propósito → encontrar dónde conseguirlo.**

**2. Base de contenido y datos pendientes**

Usaremos las imágenes adjuntas como referencias visuales y la publicación compartida como material editorial.

La ficha de ITA permite ampliar la información: presenta a Laura Londoño como autora, una historia sobre las dificultades de Drilo para interpretar las señales del río y el apoyo de su abuela. También indica lectura a partir de cinco años, 36 páginas, tapa blanda, impresión a color y formato de 25 × 25 cm. Estos datos deberán corresponder específicamente a la edición de ITA. [Ficha editorial](https://itabooks.com/producto/el-coco-que-leia-en-el-rio/).

Antes de publicar habrá que resolver:

| Dato | Tratamiento en la propuesta |
|---|---|
| Título | Usar provisionalmente **«El coco que leía el río»**, como aparece en la portada. Confirmar la diferencia con «…en el río» en las tiendas. |
| Preventa o venta | Campo editable. Mientras se confirma, usar **«Encuentra el libro»**. |
| Lanzamiento | No activar cuenta regresiva: las imágenes mencionan el 14 de noviembre sin precisar el año. |
| Precio y envío | Consultarlos en cada tienda; evitar duplicar información cambiante inicialmente. |
| Biografía | Redactar un borrador a partir de la publicación y someterlo a revisión. |
| Imágenes interiores | Incorporarlas cuando existan archivos autorizados y con calidad suficiente. |

**3. Dirección visual: Drilo y su río**

Drilo será el elemento de mayor peso visual. Su ilustración ocupará aproximadamente la mitad de la primera pantalla en escritorio y tendrá presencia inmediata en móvil.

La identidad partirá del material recibido:

- **Verde:** Drilo, vegetación y acciones principales.
- **Amarillo cálido:** papel y luz.
- **Azul verdoso:** río y transiciones.
- **Rojo:** pequeños acentos vinculados a su pañuelo.
- **Tinta oscura:** lectura y contraste.

Los tonos definitivos se extraerán de los originales. La textura de papel aparecerá principalmente en fondos; los párrafos tendrán superficies tranquilas y legibles.

La composición combinará ilustraciones grandes, márgenes amplios, orillas curvas y detalles dibujados. Las formas dentadas de los anuncios podrán reaparecer como un acento ocasional.

La tipografía expresiva se reservará para títulos cortos. Los párrafos usarán una fuente clara, tamaño cómodo e interlineado generoso.

**4. Estructura propuesta de la landing**

| Bloque | Contenido y composición | Función de Drilo |
|---|---|---|
| **Cabecera** | Identidad del libro, enlaces a Historia, Interior y Autora; botón «Dónde conseguirlo» y control de animaciones. | Pequeño detalle ilustrado, sin competir con la escena principal. |
| **Primera pantalla** | Título real del libro, presentación breve, Drilo grande sobre el río y portada secundaria. Botones «Encuentra el libro» y «Conoce a Drilo». | Presentarse como protagonista y dar la bienvenida al recorrido. |
| **Conoce a Drilo** | Ilustración del personaje y un párrafo sobre su manera de aprender. Composición abierta, con mucho espacio. | Acercarnos a su personalidad. |
| **Una historia que sigue el río** | Sinopsis breve dividida en tres momentos: dificultad, acompañamiento y descubrimiento. | Guiar visualmente el avance entre escenas. |
| **Asómate al cuento** | Portada y dos o tres imágenes interiores. Galería manual, ampliable y sin reproducción automática. | Conectar al personaje con el libro físico. |
| **Cada quien aprende a su ritmo** | Breve explicación del propósito del proyecto y preguntas para conversar en familia. | Acompañar el mensaje sobre empatía. |
| **Detrás de Drilo** | Presentación de Laura Londoño, fotografía o ilustración y vínculo a su perfil. Crédito de ITA. | Aparecer como un boceto o detalle del proceso creativo. |
| **Llévate a Drilo contigo** | Portada, datos confirmados y enlaces claros a ITA y Amazon. | Despedir el recorrido e invitar a continuar con el libro. |
| **Pie de página** | Créditos, redes, derechos de las ilustraciones y acceso al control de movimiento. | Pequeña aparición final junto al río. |

La compra será accesible desde la primera pantalla, sin obligar a completar el recorrido.

Los módulos de interiores y autora podrán ocultarse temporalmente si faltan materiales. Después podrán añadirse reseñas reales, actividades descargables o eventos mediante nuevas secciones.

**5. Textos iniciales para trabajar**

Estos son **borradores de la landing**, sujetos a cambios; no se presentarían como fragmentos del cuento.

| Ubicación | Propuesta |
|---|---|
| Primera pantalla | **El coco que leía el río** |
| Presentación | «Conoce a Drilo, un pequeño cocodrilo que aprende a su propio ritmo.» |
| Entrada a la historia | **Acompaña a Drilo río adentro** |
| Propósito | **Cada quien aprende a su ritmo** |
| Texto del propósito | «Un cuento para compartir y abrir conversaciones sobre la empatía y las distintas maneras de aprender.» |
| Autora | **La persona detrás de Drilo** |
| Cierre | **Nos vemos al otro lado del río** |
| Acción principal | **Encuentra el libro** |

La sinopsis se adaptará desde la información editorial, conservando sus hechos y evitando revelar el desenlace.

El tono será cálido, sencillo y respetuoso. El mensaje comercial se concentrará en los puntos de compra; las demás secciones aportarán historia, imágenes o contexto.

**6. Animaciones basadas en scroll**

La animación principal será el viaje de Drilo. Para desarrollarla propongo **GSAP con ScrollTrigger**, que permite vincular escenas y movimientos al avance del scroll. La adaptación por tamaño de pantalla y preferencias de movimiento se resolverá mediante configuraciones específicas. [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [adaptación con matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

**Decisión de implementación en fases 4 y 5:** los efectos disponibles se resuelven con timelines CSS nativas y una onda manual mediante Web Animations API. No se incorpora GSAP: el recorrido actual no necesita coreografía de poses ni medir el scroll con JavaScript. Los originales y la coreografía final del personaje siguen pendientes.

| Momento | Animación propuesta | Adaptación móvil |
|---|---|---|
| Entrada | Aparición suave de Drilo y el título; una onda breve señala el río. | Entrada más corta y menor desplazamiento. |
| Primera pantalla a presentación | Drilo avanza ligeramente mientras cambia la orilla del fondo. | Cambio sencillo entre composiciones. |
| Sinopsis | En escritorio, una escena permanece visible mientras aparecen tres bloques de texto. | Los tres momentos se muestran en secuencia vertical. |
| Interior | Las imágenes entran con un desplazamiento pequeño. | Aparición simple, sin rotaciones. |
| Autora | Transición del río al papel o al entorno de trabajo. | Transición estática si resulta más clara. |
| Cierre | Drilo llega a una orilla junto a la portada y los enlaces. | Composición compacta y estable. |

Reglas de movimiento:

- Conservar el scroll natural.
- Limitar las escenas retenidas a una secuencia corta en escritorio.
- Evitar bucles constantes durante la lectura.
- Mantener disponibles textos y botones aunque falle JavaScript.
- Ofrecer una versión estática completa al desactivar animaciones.
- Configurar cada movimiento por sección para poder retirarlo de forma independiente.

Con los recursos actuales, el primer diseño podrá trabajar con la portada. El viaje completo necesitará una ilustración independiente de Drilo y elementos del río separados en capas.

**7. Títulos que cambian al pasar el mouse**

**Alcance actualizado en fase 5, por petición del usuario:** el movimiento de texto se limita al **título principal**. Se sustituye la propuesta inicial de alterar palabras en títulos secundarios por una onda de movimiento que conserva siempre la escritura correcta. Los subtítulos y el cuerpo permanecen estáticos.

1. El título aparece completo y legible desde el inicio.
2. Al entrar el puntero, una onda recorre sus letras durante un máximo de **720 ms**.
3. El botón «Animar el título» permite probar la misma onda con teclado o toque.
4. El título recupera su posición al terminar, aunque el puntero siga encima. No se repite en bucle ni se acumulan interacciones.
5. Salir con el puntero, perder el foco del botón, ocultar la página o desactivar movimiento cancela la onda.
6. Al avanzar por la primera pantalla, las palabras derivan suavemente con el scroll, sin ocultarse ni cambiar su contenido.

Se conservan el nombre accesible, los espacios y los acentos al copiar y pegar. La animación usa transformaciones y no modifica la distribución del contenido. El control general y la preferencia de movimiento reducido desactivan tanto la onda como la deriva.

La explicación junto al botón es «Una onda en las letras, como el agua del río». Es un juego gráfico del río; no se plantea como una simulación de cómo lee una persona con dislexia.

**8. Cómo quedará editable**

Se aprovechará la base existente en Astro y TypeScript. El contenido estará separado de las plantillas visuales.

| Elemento | Qué se podrá modificar |
|---|---|
| Libro | Título, sinopsis, portada, edición y datos confirmados. |
| Autora | Nombre, biografía, retrato y redes. |
| Secciones | Orden, visibilidad, títulos, párrafos, imágenes y botones. |
| Galería | Añadir, reemplazar o retirar imágenes; editar pies y textos alternativos. |
| Tiendas | URL, etiqueta del botón y estado comercial por tienda. |
| Diseño | Colores, tipografías, espacios y tamaños mediante variables comunes. |
| Animaciones | Activación, intensidad, duración y comportamiento móvil. |
| Metadatos | Descripción, imagen para compartir y título de buscadores. |

Cada sección tendrá un identificador estable y un campo para activarla u ocultarla. Así, reemplazar una imagen no requerirá reconstruir la escena ni cambiar los enlaces del menú.

La primera versión se editará mediante archivos de contenido documentados. Si más adelante necesitas edición visual desde un panel, se podrá conectar un CMS manteniendo esos mismos campos.

**9. Materiales necesarios y funcionamiento provisional**

| Recurso | Prioridad | Mientras llega |
|---|---|---|
| Portada original | Alta | Usar el material recibido como referencia de composición. |
| Drilo con fondo transparente | Alta para la animación principal | Reservar su espacio y trabajar con la portada. |
| Río, hojas y orillas separados | Media | Crear formas de apoyo sencillas y reemplazables. |
| Dos o tres interiores autorizados | Media | Ocultar la galería pública. |
| Biografía y retrato | Media | Mantener el módulo en borrador. |
| Logotipo autorizado de ITA | Media | Mostrar el nombre editorial como texto. |

No se redibujará automáticamente a Drilo: cualquier nueva pose deberá conservar su diseño y revisarse con la autora o ilustradora.

**10. Desarrollo por etapas**

| Etapa | Resultado |
|---|---|
| **Contenido** | Inventario de datos, borradores y campos pendientes. |
| **Wireframe** | Estructura móvil y escritorio con espacios reemplazables para imágenes. |
| **Diseño visual** | Una propuesta de primera pantalla y una sección interior para fijar el lenguaje gráfico. |
| **Versión estática** | Landing completa, responsive y editable, con enlaces y contenido. |
| **Animación** | Recorrido de Drilo, transiciones y títulos interactivos. |
| **Validación** | Revisión de lectura, navegación, movimiento, enlaces y compilación. |

La primera versión incluirá el recorrido, los enlaces externos y la estructura editable. Galerías ampliadas, recursos descargables y reseñas se incorporarán cuando exista contenido para sostenerlos.

**11. Criterios para considerar lista la implementación**

- Drilo tiene protagonismo visible desde la primera pantalla.
- Se entiende qué libro es, de qué trata y dónde encontrarlo.
- Las secciones pueden cambiar de orden, ocultarse y recibir nuevos recursos.
- La lectura funciona en móvil, con teclado y con animaciones desactivadas.
- Las alteraciones de títulos son breves, reversibles y están contextualizadas.
- Las imágenes tienen dimensiones reservadas, compresión y textos alternativos adecuados.
- Los enlaces de ITA y Amazon se revisan manualmente.
- Título, edición y estado de venta están confirmados antes de publicar.
- Pasan `npm run check` y `npm run build`.
- Se preparan los metadatos y la imagen para compartir antes de retirar el `noindex` de la base actual.

Este documento define la estructura y el comportamiento propuestos. La fase **Contenido** quedó preparada el **22 de noviembre de 2026**: [inventario, fuentes y pendientes](CONTENIDO.md), [borradores y datos editables](src/content/landing.ts) y [contratos de contenido](src/content/types.ts). Los textos siguen sujetos a revisión editorial; completar esta fase no confirma el título ni autoriza los materiales pendientes. Se verificaron `npm run check` y `npm run build`.

La fase **Wireframe** quedó implementada el **22 de noviembre de 2026**: [composición móvil y escritorio, contraste con Contenido y continuidad](WIREFRAME.md). La ruta inicial ya consume los datos editoriales, respeta el orden y la visibilidad de las secciones y reserva espacio para las imágenes faltantes. Interior y Autora continúan desactivados; solo se muestra la tienda de ITA preparada en la fase anterior. Se verificaron `npm run check`, `npm run build`, anclas, acceso por teclado y distribución a 320, 390, 768 y 1440 px sin desbordamiento horizontal.

La fase **Diseño visual** quedó implementada el **22 de noviembre de 2026**: [dirección gráfica, variables y continuidad](DISENO-VISUAL.md). La primera pantalla y «Conoce a Drilo» fijan la propuesta de color, tipografía y orillas del río; el resto conserva la composición del wireframe con estilos comunes de lectura. Sin originales autorizados, Drilo y la portada mantienen reservas explícitas. Se conserva `noindex` y no se ha publicado.

La fase **Versión estática** quedó implementada el **22 de noviembre de 2026**: [composición completa, movimiento progresivo y verificación](VERSION-ESTATICA.md). Historia, Propósito, Compra y Pie continúan la dirección de la fase 3. Por petición expresa, se adelanta una primera capa de animaciones ligadas al scroll: trazo del cauce, recorrido de una hoja decorativa y movimiento leve de ondas y vegetación. Los controles de movimiento están operativos y se respeta la preferencia del sistema. La experiencia completa mantiene una base estática legible.

La fase **Animación** quedó implementada el **22 de noviembre de 2026** para los recursos disponibles: [efectos, accesibilidad, edición y pruebas](ANIMACIONES.md). Solo el título principal recibe movimiento de texto: onda manual y deriva ligada al scroll. Las escenas tienen profundidad por capas; la portada acompaña la entrada y se asienta en compra; Historia muestra su avance también en móvil, y el pie cierra con una orilla animada. Los textos de lectura permanecen estables y el scroll conserva su comportamiento nativo.

La siguiente fase es **Validación**: revisión editorial y de lanzamiento, integración y revisión de los originales autorizados, galería manual cuando existan interiores y pruebas finales en dispositivos y navegadores objetivo. La coreografía final de Drilo necesita su ilustración; la animación del recurso está preparada sin inventar poses. Esta entrega conserva `noindex` y no publica el sitio.

**Checklist de fases**

- [x] Contenido
- [x] Wireframe
- [x] Diseño visual
- [x] Versión estática
- [x] Animación (recursos disponibles; ilustraciones originales pendientes)
- [ ] Validación
