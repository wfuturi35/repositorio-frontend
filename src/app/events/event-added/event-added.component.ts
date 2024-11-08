import {
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";
import {MessageService} from "primeng/api";
import {AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {MatButton} from "@angular/material/button";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {EventModel, EventoResponse} from "../model/event.model";
import {map} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {EventDialogComponent} from "../event-dialog/event-dialog.component";
import {UiService} from "../../common/ui.service";
import {FavoriteService} from "../services/favorite.service";


@Component({
  selector: 'app-event-added',
  standalone: true,
  imports: [
    NgIf,
    ButtonDirective,
    ReactiveFormsModule,
    ChipsModule,
    DropdownModule,
    NgForOf,
    CardModule,
    CurrencyPipe,
    AsyncPipe,
    Button,
    MatButton,
    TagModule,
    RouterLink,
    NgStyle,
    MatPaginator,
    MessagesModule,
    NgClass,
    ToastModule,
    DialogModule,
    EventDialogComponent
  ],
  templateUrl: './event-added.component.html',
  styleUrl: './event-added.component.scss'

})
export class EventAddedComponent implements OnInit {

  regiones = [
    { id: 1, nombre: 'LIMA' },
    { id: 2, nombre: 'CUSCO' },
  ];

  categorias = [
    { id: 1, nombre: 'Conciertos' },
    { id: 2, nombre: 'Ferias' },
    { id: 3, nombre: 'Museos' },
    { id: 4, nombre: 'Turismo' },
    { id: 5, nombre: 'Cine' },
    { id: 6, nombre: 'Talleres' },
    { id: 7, nombre: 'Teatro' },
    { id: 8, nombre: 'Festivales' },
    { id: 9, nombre: 'Deportes' },
    { id: 10, nombre: 'Arte y Cultura' },
    { id: 11, nombre: 'Seminarios y Conferencias' },
    { id: 12, nombre: 'Eventos Familiares' },
    { id: 13, nombre: 'Otros' },
  ];

  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 100];

  eventsOwner$: Observable<EventModel[]> = new Observable();
  likedEvents: { [key: number]: boolean } = {}; // Almacena los likes de cada evento por su ID
  favoriteService = inject(FavoriteService)
  uiService = inject(UiService)

  eventoForm: FormGroup;
  mostrarFormulario = false;
  eventoService = inject(EventService);
  fb = inject(FormBuilder);
  messageService = inject(MessageService);

  constructor(
  ) {
    this.eventoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: [0, Validators.required],
      imgEvent: ['', Validators.required],
      shareable: [true],
      categoryId: [null, Validators.required],
      regionId: [null, Validators.required],
      company: ['', Validators.required],
      urlEvent: ['', Validators.required]
    });
  }


  ngOnInit(): void {
   this.loadEvents(this.currentPage, this.pageSize);
  }

  agregarEvento(): void {
    if (this.eventoForm.valid) {
      this.eventoService.addEvento(this.eventoForm.value).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Evento agregado correctamente',
          });
          this.eventoForm.reset();
          this.mostrarFormulario = false; // Ocultar el formulario después de agregar el evento
          this.uiService.showToast("El evento a sido agregado exitosamente");
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el evento',
          });
        }
      );
    }
  }


  // TODO: ESTE METODO NOS DEVUELVE NUESTROS EVENTOS CREADOS
  loadEvents(page: number, size: number) {
    this.eventsOwner$ = this.eventoService.getAllEventsOwner(page, size).pipe(
      map((response: EventoResponse) => {
        this.totalElements = response.totalElements;
        const events = response.content; // Guardar los eventos en una variable
        events.forEach(event => {
          this.loadEventFavorites(event.id); // Cargar el estado favorito de cada evento
        });
        return events; // Retornar la lista de eventos
      })
    );
  }


  // TODO: FUNCIONES PARA EL CAMBIO DE ESTADO DEL FAVORITO
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

  // Alternar el estado de favorito al hacer click
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

  // TODO: FUNCION DE ESTRELLAS
  getStars(rate: number): { filled: boolean }[] {
    const totalStars = 5; // Total de estrellas a mostrar
    return Array.from({ length: totalStars }, (_, index) => ({
      filled: index < rate // Determina si la estrella debe ser dorada o gris
    }));
  }


  // TODO: LO RELACIONADO A MI FORMULARIO
  display: boolean = false; // Controla la visibilidad del diálogo
  selectedEventId: number | null = null;

  confirmDelete(eventId: number) {
    this.selectedEventId = eventId;
    this.display = true; // Muestra el diálogo de confirmación
  }

  onConfirm() {
    if (this.selectedEventId !== null) {
      this.eventoService.removeEvent(this.selectedEventId).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Evento eliminado exitosamente' });
          this.display = false; // Oculta el diálogo
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor comuníquese con el administrador' });
          this.display = false; // Oculta el diálogo
        }
      });
    }
  }

  onReject() {
    this.display = false;
  }

  @ViewChild('appEventDialog') eventDialogComponent!: EventDialogComponent;
  onEventClick(eventOwner: EventModel) {
    this.eventDialogComponent.eventOwner = eventOwner;
    this.eventDialogComponent.openEditDialog();
  }

// Función para obtener el nombre de la categoría según el ID
  getCategoryName(idCategoria: number): string {
    const categoria = this.categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.nombre : 'Categoría desconocida'; // Devuelve 'Categoría desconocida' si no encuentra la categoría
  }


}
