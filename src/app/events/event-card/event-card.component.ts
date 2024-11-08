import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {MatButton} from "@angular/material/button";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    Button,
    MatButton,
    NgOptimizedImage,
    PrimeTemplate,
    TagModule,
    NgStyle
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

}
