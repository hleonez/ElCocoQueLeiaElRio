import type { Author, Book, LandingContent } from './types';

/**
 * Borradores de la fase Contenido, no fragmentos del cuento.
 * Consultar CONTENIDO.md antes de aprobar textos, añadir recursos o publicar.
 * La propuesta visual de index.astro consume estos datos y respeta enabled y el orden.
 * Añadir illustration a Inicio, Drilo o Historia solo al recibir los originales autorizados.
 */
const itaProductUrl = 'https://itabooks.com/producto/el-coco-que-leia-en-el-rio/';

export const book: Book = {
  // Título provisional del plan; confirmar su diferencia con la ficha de ITA.
  title: 'El coco que leía el río',
  author: 'Laura Londoño',
  synopsis:
    'Entender las señales del río es un reto para Drilo. Las burlas de su hermano lo hacen dudar, pero su abuela le ofrece otra mirada: aprender puede tomar caminos distintos.',
  seoDescription:
    'Conoce a Drilo en El coco que leía el río, un cuento de Laura Londoño para compartir y conversar sobre la empatía y las distintas maneras de aprender.',
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
  name: book.author,
  // Adaptación de la reseña de Alianza Francesa; pendiente de revisión de Laura.
  biography:
    'Laura Londoño Ospina nació en Barranquilla, Colombia. Su camino creativo parte del dibujo y el diseño gráfico. Con este cuento, lleva su interés por la ilustración al mundo de las historias para niños.',
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
      paragraphs: ['Conoce a Drilo, un pequeño cocodrilo que aprende a su propio ritmo.'],
      primaryAction: { label: 'Encuentra el libro', target: 'libro' },
      secondaryAction: { label: 'Conoce a Drilo', target: 'drilo' },
    },
    {
      id: 'drilo',
      enabled: true,
      heading: 'Conoce a Drilo',
      paragraphs: [
        'Lo que otros cocodrilos entienden con facilidad, a Drilo le cuesta un poco más. A su lado, nos acercamos a las dudas que aparecen cuando aprender no resulta tan sencillo.',
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
          text: 'Las señales del río no son igual de claras para todos. Drilo intenta comprenderlas.',
        },
        {
          heading: 'Alguien que acompaña',
          text: 'Frente a las burlas, su abuela le recuerda que no hay una sola manera de aprender.',
        },
        {
          heading: 'Una pregunta para seguir',
          text: '¿Qué cambiaría si miráramos lo que nos cuesta con más paciencia? Acompaña a Drilo a descubrirlo.',
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
      heading: 'Cada quien aprende a su ritmo',
      paragraphs: [
        'Un cuento para compartir y abrir conversaciones sobre la empatía y las distintas maneras de aprender.',
        'Después de leer, podemos hacer una pausa para escuchar cómo vive cada persona sus propios retos.',
      ],
      questions: [
        '¿Cómo crees que se siente Drilo cuando algo le cuesta?',
        '¿Qué te ayuda cuando estás aprendiendo algo nuevo?',
        '¿Cómo podemos acompañar a alguien sin compararlo con los demás?',
      ],
    },
    {
      id: 'autora',
      enabled: false,
      navigationLabel: 'Autora',
      heading: 'La persona detrás de Drilo',
      paragraphs: [author.biography],
    },
    {
      id: 'libro',
      enabled: true,
      navigationLabel: 'Dónde conseguirlo',
      heading: 'Llévate a Drilo contigo',
      paragraphs: [
        'Encuentra una historia para leer en compañía y seguir conversando después de la última página.',
        'Consulta el precio, la disponibilidad y las condiciones de envío directamente en la tienda.',
      ],
    },
  ],
  footer: {
    id: 'pie',
    enabled: true,
    farewell: 'Nos vemos al otro lado del río',
    credits: 'Una historia de Laura Londoño. Edición impresa de ITA.',
    // Añadir derechos y perfiles solo cuando estén confirmados.
    links: [],
  },
  // El control de movimiento ya funciona; el juego de letras queda para la fase 5.
  controls: {
    enableMotion: 'Activar animaciones',
    disableMotion: 'Desactivar animaciones',
    reducedMotion: 'Movimiento reducido del sistema',
    tryLetters: 'Probar el juego de letras',
    letterPlayExplanation: 'Un juego visual sobre las letras y las distintas maneras de aprender.',
    letterPlayContext:
      'Este efecto es un recurso gráfico y no representa cómo lee una persona con dislexia.',
  },
  seo: {
    title: `${book.title} | ${book.author}`,
    description: book.seoDescription,
    noindex: true,
  },
};
