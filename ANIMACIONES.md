# Animaciones de la landing de Drilo

## Actualización · 24 de noviembre de 2026

Por solicitud del usuario se retiraron los botones globales de cabecera y pie. El movimiento se activa por defecto, sin consultar ni escribir `localStorage`; una preferencia antigua de los controles retirados no lo desactiva. Se conserva `prefers-reduced-motion` del sistema y la cancelación de la onda si cambia. El inicio del movimiento se carga desde `LandingLayout.astro`, independiente de los botones retirados. El botón «Animar el título» sigue disponible.

El guion `scripts/verify-motion.py` se adaptó a este comportamiento y a la sección Autora habilitada. El registro de verificación histórico que sigue corresponde a la fase 5 anterior; las comprobaciones de esta actualización se realizan con revisión de tipos, compilación y navegador.

## Registro histórico de fase 5

Fase 5 de [PLAN-LANDING.md](PLAN-LANDING.md), implementada el **22 de noviembre de 2026** sobre la fase 4. El recorrido conserva el lenguaje visual, la lectura completa y los pendientes editoriales. Por petición del usuario, **solo el título principal recibe animaciones de texto**.

## Dirección y experiencia

Se mantienen tinta `#203b32`, bosque `#244e3b`, papel `#fff4c9`, río `#b6deda`, vegetación `#739044` y pañuelo `#a83f35`, con Georgia y Trebuchet MS. El texto sigue alineado a la izquierda. No se añaden pantallas, tarjetas ni textos de venta: el río aporta el movimiento, mientras las zonas de lectura conservan su posición.

```text
Inicio                 Drilo                Historia              Compra y pie
título con onda        orilla y luz         hoja por el cauce     portada se asienta
portada acompaña       capas independientes trazo de cada momento orilla de despedida
```

La revisión del brief concentra el gesto más expresivo en la onda del título. El resto usa distancias cortas y progreso continuo del scroll; no se repite una entrada de párrafos en cada sección. No hay bucles automáticos, scroll interceptado ni contenido que deba desbloquearse esperando una animación.

| Componente | Movimiento | Adaptación |
| --- | --- | --- |
| `AnimatedTitle` | Onda por letras con puntero o botón; deriva por palabras al salir la primera pantalla. | Onda de hasta 720 ms; 5 px en móvil y 9 px en escritorio. Texto siempre correcto y legible. |
| `RiverScene` | Orilla y luz avanzan a ritmos diferentes; ondas y vegetación conservan el movimiento de fase 4. El original del personaje, cuando se integre, tiene una deriva independiente. | Amplitudes menores en móvil. Las reservas de Drilo permanecen explícitas. |
| Portada de Inicio | Flota y cambia ligeramente de inclinación al avanzar la primera pantalla. | Elevación máxima configurada en 12 px en móvil y 24 px en escritorio. |
| `RiverJourney` | La hoja sigue exactamente la geometría del cauce; el trazo avanza y retrocede con ella. | En móvil y ventanas bajas usa la timeline de su propia escena, para que el movimiento ocurra mientras está visible. En escritorio amplio usa los tres momentos y retención corta. |
| Momentos de Historia | Una línea de acento dibuja el avance al pasar cada momento. | Solo se transforma el indicador decorativo; títulos y párrafos permanecen quietos. |
| Portada de compra | Llega con una elevación e inclinación cortas y se asienta en la orilla. | Transformación progresiva; ficha y enlaces de compra estables. |
| Pie | La curva de la orilla se abre al entrar. | Decoración independiente de la despedida y los créditos. |
| Avance de página | Un trazo fino en el borde superior refleja el progreso total. | Decorativo, sin foco, sin interceptar clics; se oculta al desactivar movimiento. |

Los enlaces internos usan desplazamiento suave nativo solo con movimiento permitido. La rueda, el teclado y los gestos conservan el scroll del navegador. Las timelines se actualizan sin listeners de `scroll`, `wheel` o `touchmove` de la aplicación.

## Título y accesibilidad

El título mantiene sus caracteres, espacios y acentos en el DOM y su nombre accesible completo. Los spans visuales no producen lecturas repetidas. La onda usa `transform`: no cambia el tamaño de las letras ni la distribución de las líneas, y los elementos siguientes no se desplazan durante el juego.

La onda se ejecuta una vez por entrada del puntero o activación del botón. No se acumulan ejecuciones; al terminar se liberan las animaciones. Salir del título con el puntero, perder el foco del botón, ocultar la página, pausar movimiento o activar movimiento reducido cancela la onda y restaura la posición. El texto no se sustituye ni invierte, y no se presenta como una simulación de dislexia.

El control global de cabecera y pie sigue sincronizado y conserva la preferencia cuando el almacenamiento está disponible. La preferencia del sistema prevalece, incluso si cambia durante una onda. Pausar elimina las timelines, el indicador de progreso, el desplazamiento suave y la retención de Historia; el botón del título queda deshabilitado. Bloquear `localStorage` no impide usar los controles en la sesión.

Sin JavaScript, el título y el contenido permanecen completos y los controles se ocultan. CSS sigue respetando movimiento reducido. Sin soporte de timelines, no se activa la capa de scroll; el juego del título puede seguir funcionando si está disponible Web Animations API. Los controles solo aparecen cuando hay efectos utilizables.

## Implementación y edición

- `src/components/AnimatedTitle.astro`: composición del único texto animado, nombre accesible y botón nativo.
- `src/scripts/title-motion.ts`: onda manual mediante [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), con cancelación y limpieza de las ejecuciones.
- `src/scripts/motion.ts`: estado global, almacenamiento opcional y cambios del sistema.
- `src/styles/motion.css`: [timelines CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline), rangos por escena, amplitudes responsive y transformaciones.
- `src/content/landing.ts`: título y etiquetas editables. `tryLetters` conserva el nombre del campo anterior, ahora con la etiqueta «Animar el título».

No se añaden dependencias de producción, fuentes externas ni trabajo JavaScript por cada frame de scroll. Se conserva la corrección de fase 4 que impide al minificador combinar las timelines en una abreviatura incompatible con algunos navegadores. La excepción al uso de transformaciones es el trazo SVG de Historia, acotado a su escena.

Interior y Autora siguen desactivados. No se crean poses ni imágenes de Drilo: el movimiento de su recurso está preparado para cuando se integre `section.illustration`. La animación actual de la hoja no representa al personaje. La coreografía y revisión artística final dependen de los originales autorizados; la fase implementa la experiencia con los materiales disponibles.

## Verificación y GitHub

`npm run check` termina con 0 errores y 0 advertencias; persisten ocho sugerencias del submódulo de skills. `npm run build` genera correctamente la landing estática. `scripts/verify-motion.py` verifica esa compilación con Playwright en Edge:

- Nombre accesible y texto copiable del título, onda por puntero, teclado y toque, restauración sin bucles y sin desplazar el contenido siguiente.
- Avance y reversión real de título, escenas, portada, indicador total y cauce con el scroll; progreso decorativo de los momentos y llegada a compra.
- Ausencia de listeners de entrada de scroll de la aplicación y de animaciones sobre subtítulos y textos de lectura.
- Pausa durante una onda, sincronización, persistencia, cambio del sistema en vivo y almacenamiento bloqueado.
- Distribución a 320, 390, 768, 1024 y 1440 px, sin desbordamiento horizontal; río móvil con movimiento mientras está visible y sin retención en móvil o ventana baja.
- Teclado, anclas, compra y lectura sin JavaScript; un solo `h1`, cinco secciones activas, `noindex` y ausencia de errores JavaScript de página.

Capturas: [Inicio en escritorio](design/previews/fase5-escritorio.jpg), [Inicio en móvil](design/previews/fase5-movil.jpg), [título durante la onda](design/previews/fase5-titulo.png), [Historia](design/previews/fase5-historia.jpg) y [río móvil](design/previews/fase5-movil-rio.jpg). Una captura registra un instante; la prueba comprueba el avance temporal. La revisión visual no sustituye las pruebas finales en dispositivos reales y navegadores objetivo de la fase 6.

La rama `codex/fase5-animacion` se creó desde `origin/develop` actualizado (`be9e0ec`) e incorporó `origin/codex/fase4-version-estatica` conservando su historial. Las PR de fases 3 y 4 aún estaban pendientes de integración al comenzar. El sitio mantiene `noindex`; esta entrega no publica ni fusiona las ramas de desarrollo.
