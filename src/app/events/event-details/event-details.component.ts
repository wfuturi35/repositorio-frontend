import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { EventService } from "../services/event.service";
import { EventModel } from "../model/event.model";
import { Observable } from "rxjs";
import {RatingService} from "../services/rating.service";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {RatingModule} from "primeng/rating";
import {AsyncPipe} from "@angular/common";
import {DockModule} from "primeng/dock";
import {UiService} from "../../common/ui.service";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    DialogModule,
    RatingModule,
    AsyncPipe,
    RouterLink,
    DockModule,
    MatButtonModule
  ],
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  ratingService = inject(RatingService);
  uiService = inject(UiService);
  eventDetail$: Observable<EventModel> = new Observable();
  idEvento: number = 0;
  value!: number;
  visible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Obtener ID del evento desde la URL
    this.idEvento = Number(this.route.snapshot.params['id']);
    // Obtener los detalles del evento a través del servicio
    this.eventDetail$ = this.eventService.getEventById(this.idEvento);
  }

  // Mostrar el diálogo de puntuación
  showDialog() {
    this.visible = true;
  }

  // Enviar la puntuación al servicio
  guardarPuntuacion(): void {
    if (this.value) {
      this.ratingService.enviarPuntuacion(this.idEvento, this.value).subscribe({
        next: (response) => {
          this.uiService.showToast('Puntuación enviada con éxito', response);
          this.visible = false;
        },
        error: (error) => {
          this.uiService.showToast('Error al enviar la puntuación', error);
        }
      });
    }
  }

  // Mapeo del ID de la categoría al nombre de la categoría
  obtenerCategoriaPorId(idCategoria: number): string {
    const categorias: { id: number; nombre: string }[] = [
      { id: 1, nombre: "Conciertos" },
      { id: 2, nombre: "Ferias" },
      { id: 3, nombre: "Museos" },
      { id: 4, nombre: "Turismo" },
      { id: 5, nombre: "Cine" },
      { id: 6, nombre: "Talleres" },
      { id: 7, nombre: "Teatro" },
      { id: 8, nombre: "Festivales" },
      { id: 9, nombre: "Deportes" },
      { id: 10, nombre: "Arte y Cultura" },
      { id: 11, nombre: "Seminarios y Conferencias" },
      { id: 12, nombre: "Eventos Familiares" },
      { id: 13, nombre: "Otros" },
    ];

    // Buscar la categoría por id
    const categoria = categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }

  protected readonly Boolean = Boolean;
}
