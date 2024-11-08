
export interface EventRequestModel {
  id: number;
  title: string;
  description: string;
  start_date: string; // Puedes usar Date si prefieres trabajar con objetos de fecha
  price: number;
  imgEvent: string;
  shareable: boolean;
  company: string;
  urlEvent: string;
  categoryId: number;
  regionId: number;
}
