import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {initFlowbite} from "flowbite";
import {EventCategoryComponent} from "../event-category/event-category.component";
import {NgOptimizedImage} from "@angular/common";
import {EventCarouselComponent} from "../event-carousel/event-carousel.component";
import {EventRecomendationComponent} from "../event-recomendation/event-recomendation.component";

@Component({
  selector: 'app-event-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, EventCategoryComponent, NgOptimizedImage, EventCarouselComponent, EventRecomendationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-home.component.html',
  styleUrl: './event-home.component.scss'
})
export class EventHomeComponent implements OnInit{

  ngOnInit() {
    initFlowbite()
  }


}
