# Recorrido por el río de Drilo

Implementado el 24 de noviembre de 2026 en `prueba-full-ia`, a partir de `mejoras-contenido`. Sustituye la composición y coreografía anteriores; los documentos de fases 3–5 conservan su registro histórico.

## Recorrido

1. Orilla luminosa: tipografía del libro y paisaje SVG con sol, aves, vegetación y un cauce que se abre hacia abajo. Los planos cercanos y lejanos responden a distinta velocidad al scroll. Una mariposa acompaña la salida de la primera pantalla.
2. Conocer a Drilo: el cauce continúa sobre el verde de las guardas junto a la presentación del personaje. Una hoja y el trazo del agua siguen el avance.
3. Entre las señales: paisaje verde profundo con bifurcación, letreros y reflejos. La escena permanece visible mientras se leen tres momentos: señales, sensación de pequeñez y acompañamiento. Los juncos se cierran y el espacio se oscurece; después se abren. El botón opcional permite apartarlos y volverlos a colocar, con estado accesible y una explicación breve.
4. Manglar: raíces en primer plano, luz suave, cita literal de la abuela y ondas amplias. La página ofrece una pausa y preguntas para conversar.
5. Autora: regreso al crema, espacio editorial para el futuro retrato, biografía e Instagram confirmados. El tratamiento con su nombre ocupa el lugar de la foto sin inventar un retrato.
6. Libro: regreso a la orilla verde, enlace de ITA, ficha de su edición y paisaje del estuario. El desenlace se reserva al cuento.

El paisaje es escenografía original de apoyo hecha con SVG y CSS. No se han añadido las imágenes descartadas ni se representan poses inventadas de Drilo. Se conservan OpenDyslexic Regular y Bold y Poppins para créditos. No hay nuevas dependencias de producción, imágenes remotas ni servicios externos.

## Archivos

- `src/pages/index.astro`: recorrido completo y mapa de orillas en escritorio amplio.
- `src/content/journey.ts`: textos editoriales de las escenas. `landing.ts` sigue conteniendo libro, biografía, preguntas y enlaces de compra.
- `RiverLandscape.astro`, `Butterfly.astro`, `Mangrove.astro`: elementos del paisaje.
- `SignalPassage.astro`: escena de señales y tres momentos de lectura.
- `src/styles/landing.css`: composición, paleta y adaptación.
- `src/styles/motion.css`: timelines CSS del scroll y alternativa de movimiento reducido.
- `src/scripts/river-journey.ts`: interacción con juncos y observación de escenas mediante IntersectionObserver. No hay listeners de scroll, wheel ni touchmove ni bloqueo del desplazamiento.

## Lectura y accesibilidad

Los párrafos y títulos permanecen legibles y en el flujo del documento; los cambios afectan a los planos decorativos. Las dificultades se expresan con señales parcialmente ocultas y perspectivas, sin alterar el texto editorial ni afirmar que la escena simula dislexia. El scroll y los enlaces funcionan con teclado, rueda y gestos nativos.

Con `prefers-reduced-motion: reduce` se desactivan timelines y transiciones y se libera la escena retenida. Sin JavaScript, los tres momentos, la cita y la compra siguen presentes en el HTML; se omite el botón que requiere JavaScript. Sin IntersectionObserver la interacción de los juncos sigue funcionando. El indicador de navegación es solo una ayuda adicional.

Colores del libro: crema `#faf3dc`, guardas `#bcceb9`, café `#381c13` (aproximación del CMYK facilitado). Se suman tonos de paisaje, especialmente `#233c32` y `#172e26`. Contraste de crema sobre verde profundo: 10.73:1; crema en el punto más luminoso del manglar: 6.12:1; verde claro sobre verde profundo: 7.18:1; café sobre guardas: 9.43:1.

## Validación

- `npm test`: regresiones de la interacción accesible y avance/reversión de escenas, incluido el comportamiento sin IntersectionObserver.
- `npm run check`: tipado y componentes Astro.
- `npm run build`: salida estática.
- `scripts/verify-motion.py`: guion de regresión de navegador actualizado para este recorrido (Playwright y Edge). La comprobación de navegador de esta entrega se hizo con las herramientas de navegador de Codex, sin ejecutar ese guion.
- Revisión de navegador a 320, 390, 768 y 1440 px; sin desbordamiento horizontal. Interacción de juncos y navegación comprobadas. Contenido estático validado en el HTML generado, con un h1 y todos los destinos internos existentes.

Las skills aplicadas fueron Sites (composición, preparación y QA local) y scroll-animations del proyecto. Esta última contiene únicamente una plantilla XML de salida, sin librería ni implementación; se desarrolló la coreografía con APIs nativas. La skill se registra a continuación en su formato de salida:

```xml
<result>
  <analysis>El recorrido anterior no expresaba las dificultades iniciales ni la calma del acompañamiento.</analysis>
  <solution>Paisaje por capas, escena de señales observada durante el scroll y pausa bajo el manglar.</solution>
  <considerations>Texto estable, scroll nativo, movimiento reducido y lectura sin JavaScript.</considerations>
</result>
```

Capturas de esta entrega: [orilla](design/previews/recorrido-orilla.jpg) y [señales](design/previews/recorrido-senales.jpg).
