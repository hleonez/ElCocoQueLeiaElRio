/** Contratos editoriales. Los estados y las fuentes se documentan en CONTENIDO.md. */
export interface Book {
  title: string;
  author: string;
  synopsis: string;
  /** Omitir hasta disponer de un archivo autorizado; no usar rutas ficticias. */
  cover?: string;
  seoDescription: string;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  editions?: BookEdition[];
}

/** Los datos físicos pertenecen a una edición, no a todas las tiendas. */
export interface BookEdition {
  id: string;
  publisher: string;
  pageCount: number;
  minimumReadingAge: number;
  binding: string;
  dimensions: string;
  printing: string;
  sourceUrl: string;
}

export interface Author {
  name: string;
  biography: string;
  photo?: string;
  links: ExternalLink[];
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface PurchaseLink extends ExternalLink {
  id: string;
  platform: string;
  editionId?: string;
}

export interface PhysicalStore {
  id: string;
  name: string;
  city: string;
  address: string;
  mapsUrl: string;
}

export type SectionId =
  | 'inicio'
  | 'drilo'
  | 'historia'
  | 'interior'
  | 'proposito'
  | 'autora'
  | 'libro';

export interface SectionAction {
  label: string;
  target: SectionId;
}

export interface StoryMoment {
  heading: string;
  text: string;
}

/** Ilustración original autorizada, con dimensiones reales para reservar su espacio. */
export interface SectionIllustration {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** El orden del arreglo define el recorrido. El menú deberá usar solo secciones habilitadas. */
export interface LandingSection {
  id: SectionId;
  enabled: boolean;
  heading: string;
  paragraphs: string[];
  navigationLabel?: string;
  primaryAction?: SectionAction;
  secondaryAction?: SectionAction;
  moments?: StoryMoment[];
  questions?: string[];
  illustration?: SectionIllustration;
}

/** Añadir únicamente imágenes disponibles y autorizadas para la web. */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  credit: string;
}

export interface LandingContent {
  book: Book;
  author: Author;
  purchaseLinks: PurchaseLink[];
  physicalStores: PhysicalStore[];
  gallery: GalleryImage[];
  sections: LandingSection[];
  footer: {
    id: 'pie';
    enabled: boolean;
    farewell: string;
    credits: string;
    rightsNotice?: string;
    links: ExternalLink[];
  };
  controls: {
    enableMotion: string;
    disableMotion: string;
    tryLetters: string;
    letterPlayExplanation: string;
    letterPlayContext: string;
  };
  seo: {
    title: string;
    description: string;
    noindex: boolean;
    socialImage?: GalleryImage;
    canonicalUrl?: string;
  };
}
