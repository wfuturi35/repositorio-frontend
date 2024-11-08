import {Component, inject,OnInit} from '@angular/core';
import {EventModel, EventoResponse} from "../model/event.model";
import {EventService} from "../services/event.service";
import { MatPaginatorModule} from "@angular/material/paginator";
import {TagModule} from "primeng/tag";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";

@Component({
  selector: 'app-all-event',
  standalone: true,
  imports: [
    TagModule,
    NgStyle,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    Button,
    NgForOf,
    AsyncPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './all-event.component.html',
  styleUrl: './all-event.component.scss'
})
export class AllEventComponent implements OnInit{

  events$: Observable<EventModel[]> = new Observable();
  filteredEvents$: Observable<EventModel[]> = new Observable();
  totalElements: number = 0;       // Total de eventos
  pageSize: number = 12;            // Tamaño de la página, 6 *cards* por página
  currentPage: number = 0;         // Página actual
  pageSizeOptions: number[] = [5, 10, 20, 100];  // Opciones de tamaño para la paginación
  uiService = inject(UiService);
  favoriteService = inject(FavoriteService);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en la búsqueda
    this.loadEvents(this.currentPage, this.pageSize);

  }


  // Método para cargar los eventos
  loadEvents(page: number, size: number) {
    this.events$ = this.eventService.getAllEvents(page, size).pipe(
      map((response: EventoResponse) => {
        this.totalElements = response.totalElements;
        const events = response.content; // Guardar los eventos en una variable
        events.forEach(event => {
          this.loadEventFavorites(event.id); // Cargar el estado favorito de cada evento
        });
        return events; // Retornar la lista de eventos
      })
    );
    this.filteredEvents$ = this.events$;
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents(this.currentPage, this.pageSize);
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

