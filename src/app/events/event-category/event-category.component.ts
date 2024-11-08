import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {EventModel} from "../model/event.model";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Button} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {MatButton} from "@angular/material/button";
import {PrimeTemplate} from "primeng/api";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {initFlowbite} from "flowbite";
import {map} from "rxjs/operators";
import {RecommendedEventsResponse} from "../model/event-gcn";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";

@Component({
  selector: 'app-event-category',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    Button,
    CarouselModule,
    MatButton,
    NgOptimizedImage,
    PrimeTemplate,
    TagModule,
    RouterLink
  ],
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss'
})
export class EventCategoryComponent implements OnInit{

  categoriasSeleccionadas: number[] = [];
  categoryService = inject(CategoryService);
  uiService = inject(UiService);
  favoriteService = inject (FavoriteService);
  responsiveOptions: any[] | undefined;

  eventCategory$: Observable<EventModel[]> = new Observable();
  error: string | null = null;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.categoriasSeleccionadas = this.categoryService.getCategoriasSeleccionadas();
    this.obtenerEventos()
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

  obtenerEventos(): void {
    this.eventCategory$ = this.categoryService.getEventosByCategorias(this.categoriasSeleccionadas).pipe(
      map(data => {
        const carruselEvents = data;
        carruselEvents.forEach(event => this.loadEventFavorites(event.id));
        return carruselEvents;
      })

    )
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


