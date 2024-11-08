import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener, inject,
  Input,
  input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {EventModel} from "../model/event.model";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {Router} from "@angular/router";


@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ChipsModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule
  ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDialogComponent implements OnInit {

  eventForm!: FormGroup;
  display: boolean = false;
  @Input() eventOwner!: EventModel;

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.eventForm = this.fb.group({
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

  openEditDialog() {
    this.display = true;
    // Llenar el formulario con los datos del evento
    this.eventForm.patchValue({
      title: this.eventOwner.title,
      description: this.eventOwner.description,
      start_date: this.eventOwner.start_date,
      end_date: this.eventOwner.end_date,
      price: this.eventOwner.price,
      company: this.eventOwner.company,
      imgEvent: this.eventOwner.imgEvent,
      categoryId: this.eventOwner.categoria_id,
      regionId: this.eventOwner.region_id,
      urlEvent: this.eventOwner.urlEvent,
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dialogElement = document.getElementById('appEventDialog');
    if (this.display && dialogElement && !dialogElement.contains(event.target as Node)) {
      this.display = false;
    }
  }

  // Actualizar evento
  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.eventOwner, ...this.eventForm.value };
      this.eventService.updateEvent(updatedEvent).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Evento actualizado exitosamente' });
          this.display = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el evento' });
        }
      });
    }
  }

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
}
