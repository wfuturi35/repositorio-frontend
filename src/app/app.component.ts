import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "./auth/auth.service";
import {initFlowbite} from "flowbite";

//PrimeNg
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {MenuModule} from "primeng/menu";
import {Button} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {MatDialog} from "@angular/material/dialog";
import {OrganizerEventComponent} from "./user/organizer-event/organizer-event.component";
import {EventService} from "./events/services/event.service";
import {AllEventComponent} from "./events/all-event/all-event.component";
import {EventModel} from "./events/model/event.model";
import {catchError} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {EventSearchComponent} from "./events/event-search/event-search.component";
import {SearchService} from "./events/services/search.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    NgOptimizedImage,
    AsyncPipe,
    NgxUiLoaderModule,
    NgClass,
    FormsModule,
    ChipsModule,
    MenuModule,
    Button,
    AvatarModule,
    OrganizerEventComponent,
    AllEventComponent,
    NgIf,
    EventSearchComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  title = 'cultureAppFront';
  selectedOption: string = 'nada'; // Opción seleccionada por defecto (ciudad en este caso)
  items: MenuItem[] | undefined;
  authService = inject(AuthService)
  searchService =inject(SearchService);

  searchTerm: string = '';

  searchEvents() {
    this.searchService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/events/search'], { queryParams: { q: this.searchTerm } });
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(OrganizerEventComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  selectOption(option: string) {
    this.selectedOption = option;
  }

  constructor(
    private primeNGConfig: PrimeNGConfig,
  private router: Router
  ) {}

  ngOnInit() {
    this.primeNGConfig.ripple = false;
    this.primeNGConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      choose: 'Seleccionar',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'JUeves','Viernes','Spabado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
    })
    this.primeNGConfig.zIndex ={
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    }
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            command: () => {
              this.router.navigate(['/user/profile']);
            }
          },
          {
            label: 'Mis Favoritos',
            icon: 'pi pi-heart',
            command: () => {
              this.router.navigate(['/events/favorite']);
            }
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.router.navigate(['/user/logout']);
            }
          }
        ]
      },
      {
        separator: true
      }
    ];
    initFlowbite();
  }

}
