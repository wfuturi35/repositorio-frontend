import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-event-carousel',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './event-carousel.component.html',
  styleUrl: './event-carousel.component.scss'
})
export class EventCarouselComponent implements OnInit{

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private router: Router) {}
  goToEventInfo(){
    this.router.navigate(['events/event-info']);
  }


}
