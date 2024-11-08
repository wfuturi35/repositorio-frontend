import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../model/event.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getFavoriteEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/favoritos/events`);
  }

  //AGREGA CON TRUE EL EVENTO FAVORITO y TAMBIEN LO ELIMINA SI LE VUELVES A DAR CLICK
  toggleFavorite(eventId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favoritos/toggle/${eventId}`, {});
  }

  //ME DEVUELVE EL ESTADO DEL EVENTO ESTE ES DE TIPO OBSERVABLE PARA QUE CUANDO CUALQUIER COMPONENTE CAMBIE SU ESTADO SE REFLEJE EN TIEMPO REAL EL CAMBIO DE ESTADO S
  statusFavoriteEvent(eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/favoritos/events/${eventId}`);
  }

}
