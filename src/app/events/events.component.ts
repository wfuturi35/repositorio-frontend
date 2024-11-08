import {Component, OnInit} from '@angular/core';
import {EventCarouselComponent} from "./event-carousel/event-carousel.component";
import {RouterOutlet} from "@angular/router";
import {EventHomeComponent} from "./event-home/event-home.component";
import {initFlowbite} from "flowbite";
import {EventCategoryComponent} from "./event-category/event-category.component";
import {EventService} from "./services/event.service";
import {RatingService} from "./services/rating.service";


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    EventCarouselComponent,
    RouterOutlet,
    EventHomeComponent,
    EventCategoryComponent
  ],
  providers: [EventService, RatingService],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class EventsComponent implements OnInit{
  ngOnInit() {
    initFlowbite()
  }

}
