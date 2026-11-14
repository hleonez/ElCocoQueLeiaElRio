/** Contratos iniciales. Completar con información confirmada del libro. */
export interface Book {
  title: string;
  author: string;
  synopsis: string;
  /** Ruta al recurso; la integración de imágenes se definirá al recibir los materiales. */
  cover: string;
  seoDescription: string;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
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
}

export interface PhysicalStore {
  id: string;
  name: string;
  city: string;
  address: string;
  mapsUrl: string;
}
