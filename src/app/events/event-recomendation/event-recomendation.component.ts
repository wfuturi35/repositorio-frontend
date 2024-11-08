import { Component, inject, OnInit } from '@angular/core';
import {EventModel} from "../model/event.model";
import { EventService } from "../services/event.service";
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from "@angular/common";
import { initFlowbite } from "flowbite";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs"; // Asegúrate de importar 'of'
import { CarouselModule } from "primeng/carousel";
import { Button } from "primeng/button";
import { TagModule } from "primeng/tag";
import { CardModule } from "primeng/card";
import { MatButtonModule } from "@angular/material/button";
import { GalleriaModule } from "primeng/galleria";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EventCategoryComponent} from "../event-category/event-category.component";
import {UserTableComponent} from "../../administrator/user-table/user-table.component";
import {AuthService} from "../../auth/auth.service";
import {RecommendedEvent, RecommendedEventsResponse} from "../model/event-gcn";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";


@Component({
  selector: 'app-event-recomendation',
  standalone: true,
  imports: [NgClass,NgForOf,NgStyle,NgOptimizedImage,NgIf,AsyncPipe,CarouselModule,Button,
    TagModule,CardModule,MatButtonModule,GalleriaModule,RouterLink,EventCategoryComponent,
    UserTableComponent,
  ],
  templateUrl: './event-recomendation.component.html',
  styleUrls: ['./event-recomendation.component.scss' // Corregido el nombre de la propiedad
  ]
})
export class EventRecomendationComponent implements OnInit {

  // ARREGLO DE OBSERVABLES
  eventsCarrusel$: Observable<EventModel[]> = new Observable();
  eventsCards$: Observable<EventModel[]> = new Observable();
  eventsRecomendacion$: Observable<RecommendedEvent[]> = new Observable();


  // SERVICIOS
  eventoService = inject(EventService);
  authService = inject(AuthService)
  uiService =  inject(UiService);
  favoriteService = inject(FavoriteService);

  responsiveOptions: any[] | undefined;
  error: string | null = null;


  constructor() {}

  ngOnInit(): void {
    let id = this.authService.currentUser$.value.id;
    this.fetchEventos();
    this.loadRecommendedEvents(id);

    initFlowbite();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  // FUNCION QUE TRAE TODOS LOS EVENTOS PROXIMOS
  fetchEventos(): void {
    const eventosProximos$ = this.eventoService.getEventos();

    // Cargar los eventos en el carrusel y las tarjetas
    this.eventsCarrusel$ = eventosProximos$.pipe(
      map(data => {
        // Obtener los primeros 3 eventos
        const carruselEvents = data.slice(0, 3);
        // Cargar el estado de favorito para cada evento en el carrusel
        carruselEvents.forEach(event => this.loadEventFavorites(event.id));
        return carruselEvents;
      })
    );

    this.eventsCards$ = eventosProximos$.pipe(
      map(data => {
        // Obtener el resto de eventos
        const cardEvents = data.slice(3);
        // Cargar el estado de favorito para cada evento en las tarjetas
        cardEvents.forEach(event => this.loadEventFavorites(event.id));
        return cardEvents;
      })
    );
  }

  loadRecommendedEvents(userId: number): void {
    this.eventsRecomendacion$ = this.eventoService.getEventsById(userId).pipe(
      map((response: RecommendedEventsResponse) => {
        const recommendedEvents = response.recommended_events;
        recommendedEvents.forEach(event => this.loadEventFavorites(event.id));
        return recommendedEvents;
      })
    );
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

  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID


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
