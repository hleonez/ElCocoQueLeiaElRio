import type { Author, Book, LandingContent } from './types';

/**
 * Contenido adaptado del cuento y la biografía compartidos en Drive.
 * Solo quote contiene una cita literal; el resto es redacción para la landing.
 * Consultar CONTENIDO.md para las fuentes y el límite de spoilers.
 * La propuesta visual de index.astro consume estos datos y respeta enabled y el orden.
 * Añadir illustration a Inicio, Drilo o Historia solo al recibir los originales autorizados.
 */
const itaProductUrl = 'https://itabooks.com/producto/el-coco-que-leia-en-el-rio/';

export const book: Book = {
  // Título confirmado en el PDF de la autora; ITA usa otra variante en su URL.
  title: 'El coco que leía el río',
  author: 'Laura Londoño',
  synopsis:
    'Drilo vive con su familia en un gran río. Leer sus señales le cuesta, y las burlas de su hermano lo hacen sentirse pequeño. Pero su abuela lo escucha y le recuerda que hay muchas formas de aprender…',
  seoDescription:
    'El coco que leía el río, escrito e ilustrado por Laura Londoño. Conoce a Drilo en un cuento sobre la empatía, la diversidad y la confianza en uno mismo. Desde los 5 años.',
  editions: [
    {
      id: 'ita-impresa',
      publisher: 'ITA',
      pageCount: 36,
      minimumReadingAge: 5,
      binding: 'Tapa blanda',
      dimensions: '25 × 25 cm',
      printing: 'A color',
      sourceUrl: itaProductUrl,
    },
  ],
};

export const author: Author = {
  name: 'Laura Londoño Ospina',
  role: 'Autora e ilustradora',
  // Adaptación de Biografia.docx; sin convertir su situación académica de 2025 en un dato actual.
  biography:
    'Laura nació en Barranquilla, Colombia. Desde pequeña le ha gustado dibujar y crear; ese amor por el arte la llevó a estudiar Diseño Gráfico. Ha trabajado en proyectos como La Tiendita del Stickers y ha compartido su arte en distintas ferias.',
  creativeNote: {
    heading: 'Un sueño que tomó forma de cuento',
    text: 'Ilustrar para niños era uno de sus grandes sueños. En El coco que leía el río, Laura reúne sus palabras y sus dibujos para darle vida a Drilo y al mundo que lo rodea.',
  },
  links: [],
};

export const landingContent: LandingContent = {
  book,
  author,
  purchaseLinks: [
    {
      id: 'ita',
      platform: 'ITA',
      label: 'Consultar en ITA',
      url: itaProductUrl,
      editionId: 'ita-impresa',
    },
  ],
  // No hay direcciones verificadas ni interiores autorizados en el repositorio.
  physicalStores: [],
  gallery: [],
  sections: [
    {
      id: 'inicio',
      enabled: true,
      heading: book.title,
      paragraphs: [
        'En el río de Drilo hay muchas señales por leer… y muchas formas de aprender.',
        'Un cuento para compartir desde los 5 años, sobre la empatía, la diversidad y la confianza en uno mismo.',
      ],
      primaryAction: { label: 'Encuentra el libro', target: 'libro' },
      secondaryAction: { label: 'Conoce a Drilo', target: 'drilo' },
    },
    {
      id: 'drilo',
      enabled: true,
      heading: 'Conoce a Drilo',
      paragraphs: [
        'Drilo es un joven cocodrilo. Vive en un gran río con su familia y va a la escuela con otros pequeños animales.',
        'Pero, cuando intenta leer, las letras parecen cambiar de lugar. Lo que para sus hermanos resulta fácil, a él lo confunde. ¿Alguna vez te has sentido así al aprender algo nuevo?',
      ],
    },
    {
      id: 'historia',
      enabled: true,
      navigationLabel: 'Historia',
      heading: 'Acompaña a Drilo río adentro',
      paragraphs: [book.synopsis],
      // Tres momentos editoriales; no son citas ni revelan el desenlace.
      moments: [
        {
          heading: 'Un río por entender',
          text: 'En la escuela del río, la maestra Morla enseña a leer las señales y a escribir en el lodo. Drilo lo intenta, pero las letras lo confunden.',
        },
        {
          heading: 'Alguien que acompaña',
          text: 'No todos entienden por qué le cuesta tanto. Su abuela, en cambio, lo escucha sin juzgar. Bajo la sombra de un manglar, hay tiempo para hablar.',
        },
        {
          heading: 'Muchas formas de aprender',
          text: 'Las palabras de su abuela le hacen compañía. ¿Habrá otra manera de acercarse a las señales del río? Sigue a Drilo entre las páginas del cuento.',
        },
      ],
    },
    {
      id: 'interior',
      enabled: false,
      navigationLabel: 'Interior',
      heading: 'Asómate al cuento',
      paragraphs: ['Acércate al mundo de Drilo a través de sus páginas e ilustraciones.'],
    },
    {
      id: 'proposito',
      enabled: true,
      heading: 'Hay muchas formas de aprender',
      paragraphs: [
        'A veces, algo que parece sencillo para los demás nos cuesta un poco más. La historia de Drilo invita a hacer una pausa, escuchar y tratar con cariño esas diferencias.',
        'Para leer en familia o en el aula, y dejar que cada pequeño lector encuentre sus propias preguntas.',
      ],
      quote: {
        text: 'No todos leemos las señales del río de la misma manera, Drilo',
        attribution: 'La abuela de Drilo · El coco que leía el río',
      },
      questions: [
        '¿Cómo te sientes cuando algo que estás aprendiendo te cuesta?',
        '¿Quién te escucha y te acompaña cuando lo necesitas?',
        '¿Qué podrías hacer para que un amigo se sienta acompañado al leer?',
      ],
    },
    {
      id: 'autora',
      enabled: true,
      navigationLabel: 'Autora',
      heading: author.name,
      paragraphs: [author.biography],
    },
    {
      id: 'libro',
      enabled: true,
      navigationLabel: 'Dónde conseguirlo',
      heading: 'Llévate a Drilo contigo',
      paragraphs: [
        'Abre el cuento y acompaña a Drilo. Entre el agua, el lodo y la sombra del manglar, hay una historia para leer juntos y conversar con calma.',
        'Consulta el precio, la disponibilidad y las condiciones de envío directamente en la tienda.',
      ],
    },
  ],
  footer: {
    id: 'pie',
    enabled: true,
    farewell: 'Nos vemos al otro lado del río',
    credits: 'Texto e ilustraciones de Laura Londoño Ospina. Edición impresa de ITA.',
    // Añadir derechos y perfiles solo cuando estén confirmados.
    links: [],
  },
  // Preferencias globales y juego del título, sin alterar el texto editorial.
  controls: {
    enableMotion: 'Activar animaciones',
    disableMotion: 'Desactivar animaciones',
    reducedMotion: 'Movimiento reducido del sistema',
    tryLetters: 'Animar el título',
    letterPlayExplanation: 'Una onda en las letras, como el agua del río.',
    letterPlayContext:
      'Este efecto es un recurso gráfico y no representa cómo lee una persona con dislexia.',
  },
  seo: {
    title: `${book.title} | ${book.author}`,
    description: book.seoDescription,
    noindex: true,
  },
};
