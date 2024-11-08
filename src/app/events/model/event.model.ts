export interface EventModel {
  id: number;               // Identificador único del evento
  title: string;            // Título del evento
  description: string;  //Descripción del evento
  start_date: string;    //
  end_date: string;
  price: number;
  urlEvent: string;         // URL del evento
  imgEvent: string;         // URL de la imagen del evento
  owner: string;            // Propietario del evento
  company: string;
  categoria_id: number;     // ID de la categoría del evento
  region_id: number;
  cover: string[] | null;   // Lista de URL de imágenes de portada o null si no hay
  rate: number;             // Calificación del evento
  archived: boolean;        // Indica si el evento está archivado
  shareable: boolean;       // Indica si el evento es compartible
}


export interface EventoResponse {
  content: EventModel[];
  number: number;         // Página actual
  size: number;           // Tamaño de la página
  totalElements: number;   // Total de eventos
  totalPages: number;      // Total de páginas
  first: boolean;          // Si es la primera página
  last: boolean;           // Si es la última página
}

