/** Escenas promocionales inspiradas en el inicio del cuento; no cuentan su resolución. */
export const journey = {
  opening: { label: 'Una historia para leer juntos', invitation: 'Sigue la corriente', age: 'Para pequeños lectores desde los 5 años' },
  encounter: { label: 'En la orilla', heading: 'Un gran río.\nUn pequeño Drilo.' },
  passage: {
    label: 'Entre las señales',
    heading: 'Acompaña a Drilo\nrío adentro',
    introduction: 'En el río hay caminos por descubrir. Pero las señales no siempre son fáciles de entender.',
    steps: [
      { key: 'signals', label: 'Una dirección por encontrar', heading: '¿Por dónde seguirías tú?', text: 'En la escuela del río, la maestra Morla enseña a leer las señales y a escribir en el lodo. Drilo lo intenta, pero las letras lo confunden.' },
      { key: 'small', label: 'Cuando aprender cuesta', heading: 'Todo parece un poco más grande.', text: 'A su alrededor, otros parecen entenderlo todo. Las burlas de su hermano hacen que Drilo se sienta pequeño y solo.' },
      { key: 'listening', label: 'Alguien que acompaña', heading: 'Hay quien sabe escuchar.', text: 'Su abuela lo escucha sin juzgar. Bajo la sombra de un manglar, hay tiempo para hablar. Y para mirar las cosas con más calma.' },
    ],
    reveal: 'Apartar los juncos',
    restore: 'Volver a mirar entre los juncos',
    closedCaption: 'Entre el agua y las hojas, no todas las pistas parecen claras.',
    openCaption: 'La señal ya se ve. Entenderla sigue siendo un reto para Drilo.',
  },
  rest: { label: 'Bajo la sombra del manglar', heading: 'Aquí podemos\nir más despacio.', text: 'A veces, lo que hace falta es alguien que escuche.' },
  author: { label: 'La orilla donde nació el cuento', portraitLabel: 'Palabras e ilustraciones', portraitCaption: 'Desde Barranquilla, con imaginación.' },
  book: { label: 'El viaje continúa entre páginas', heading: 'El resto del río\nte espera en el libro.', text: 'Llévate una historia para leer en compañía, hacer preguntas y descubrir que hay muchas formas de aprender.', note: 'Consulta el precio, la disponibilidad y el envío directamente en la tienda.' },
};
