import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {EventModel} from "../model/event.model";
import {CacheService} from "../../common/cache.service";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.baseUrl // URL del backend
  private cacheKey = 'EventosCategoria';

  private categoriasSeleccionadas: number[] = [];


  setCategoriasSeleccionadas(categorias: number[]): void {
    this.categoriasSeleccionadas = categorias;
  }

  getCategoriasSeleccionadas(): number[] {
    return this.categoriasSeleccionadas;
  }

  constructor(public http: HttpClient,  private cacheService: CacheService) { }

  // Metodo para obtener eventos por categorías seleccionadas
  getEventosByCategorias(categoriasSeleccionadas: number[]): Observable<EventModel[]> {
    const cachedEventos = this.cacheService.getItem<EventModel[]>(this.cacheKey);

    if (cachedEventos) {
      return of(cachedEventos); // Retorna los eventos desde el caché
    } else {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<EventModel[]>(`${this.apiUrl}/category/by-categories`, categoriasSeleccionadas, { headers })
        .pipe(
          tap(eventos => {
            this.cacheService.setItem(this.cacheKey, eventos);
          })
        )
    }
  }


}
