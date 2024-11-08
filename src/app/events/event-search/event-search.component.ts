import { Component, inject, OnInit} from '@angular/core';
import {EventModel} from "../model/event.model";
import {Observable, of, switchMap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {catchError, map} from "rxjs/operators";
import {EventService} from "../services/event.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Button, ButtonDirective} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {PrimeTemplate} from "primeng/api";
import {TagModule} from "primeng/tag";
import {FavoriteService} from "../services/favorite.service";
import {UiService} from "../../common/ui.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    Button,
    CarouselModule,
    MatButton,
    NgOptimizedImage,
    PrimeTemplate,
    TagModule,
    RouterLink,
    ButtonDirective,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.scss',
})
export class EventSearchComponent implements OnInit{

  events$: Observable<EventModel[]> = new Observable();
  private eventService = inject(EventService);
  private uiService = inject(UiService);
  private favoriteService = inject(FavoriteService);
  private route = inject(ActivatedRoute); // Inyectamos ActivatedRoute para obtener los query params
  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID

  constructor() {}

  ngOnInit() {
    // Usar switchMap para ejecutar una nueva búsqueda cada vez que cambie el parámetro 'q'
    this.events$ = this.route.queryParams.pipe(
      switchMap(params => {
        const searchTerm = params['q']; // Obtiene el valor del término de búsqueda desde la URL
        if (searchTerm) {
          // Realizar la búsqueda en el backend
          return this.eventService.searchEvents(searchTerm).pipe(
            map(data => {
              const carruselEvents = data;
              carruselEvents.forEach(event => this.loadEventFavorites(event.id));
              return carruselEvents;
            }),
            catchError((error) => {
              console.error('Error al buscar eventos:', error);
              return of([]); // Devuelve un array vacío en caso de error
            }),
          );
        } else {
          return of([]); // Si no hay término de búsqueda, devuelve un array vacío
        }
      })
    );
  }

  // Cargar el estado de favorito de un evento
  loadEventFavorites(eventId: number) {
    this.favoriteService.statusFavoriteEvent(eventId).subscribe({
      next: (isFavorite: boolean) => {
        this.likedEvents[eventId] = isFavorite; // Asignar el estado favorito
      },
      error: () => {
        console.error('Error al cargar el estado de favoritos del evento:', eventId);
      }
    });
  }

  // Alternar el estado de favorito al hacer clic
  toggleFavorite(eventId: number) {
    this.favoriteService.toggleFavorite(eventId).subscribe({
      next: () => {
        this.likedEvents[eventId] = !this.likedEvents[eventId]; // Cambiar el estado localmente
        const message = this.likedEvents[eventId] ? 'agregado' : 'removido';
        this.uiService.showToast(`El evento ha sido ${message} de tus favoritos.`);
      },
      error: () => {
        this.uiService.showToast('Error al cambiar el estado de favorito.');
      }
    });
  }

  // @ts-ignore
  getSeverity(status: string) {
    switch (status) {
      case 'joinnus':
        return 'success';
      case 'teleticket':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  // Función para devolver un arreglo de estrellas
  getStars(rate: number): { filled: boolean }[] {
    const totalStars = 5; // Total de estrellas a mostrar
    return Array.from({ length: totalStars }, (_, index) => ({
      filled: index < rate // Determina si la estrella debe ser dorada o gris
    }));
  }

  categorias = [
    { id: 1, name: 'Conciertos' },
    { id: 2, name: 'Ferias' },
    { id: 3, name: 'Museos' },
    { id: 4, name: 'Turismo' },
    { id: 5, name: 'Cine' },
    { id: 6, name: 'Talleres' },
    { id: 7, name: 'Teatro' },
    { id: 8, name: 'Festivales' },
    { id: 9, name: 'Deportes' },
    { id: 10, name: 'Arte y Cultura' },
    { id: 11, name: 'Seminarios y Conferencias' },
    { id: 12, name: 'Eventos Familiares' },
    { id: 13, name: 'Deportes' },
  ];

// Función para obtener el nombre de la categoría según el ID
  getCategoryName(idCategoria: number): string {
    const categoria = this.categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.name : 'Categoría desconocida'; // Devuelve 'Categoría desconocida' si no encuentra la categoría
  }
}
