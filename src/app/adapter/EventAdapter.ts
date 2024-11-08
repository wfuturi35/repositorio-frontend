import {EventModel, EventoResponse} from "../events/model/event.model";


export const EventAdapter= (eventResponse: EventoResponse): EventModel[] => ([
  ...eventResponse.content
])
