import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events.component";
import {EventHomeComponent} from "./event-home/event-home.component";
import {EventRecomendationComponent} from "./event-recomendation/event-recomendation.component";
import {EventFavoriteComponent} from "./event-favorite/event-favorite.component";
import {EventDetailsComponent} from "./event-details/event-details.component";
import {AllEventComponent} from "./all-event/all-event.component";
import {EventAddedComponent} from "./event-added/event-added.component";
import {EventSearchComponent} from "./event-search/event-search.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: EventHomeComponent },
      { path: 'event-added', component: EventAddedComponent},
      { path: 'recommendation', component: EventRecomendationComponent },
      { path: 'favorite', component: EventFavoriteComponent },
      { path: 'details/:id', component: EventDetailsComponent, title: 'Details page' },
      { path: 'pages', component: AllEventComponent},
      { path: 'search', component: EventSearchComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {

}
