import { AsyncPipe } from '@angular/common'
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import {CustomAuthService} from "../../auth/auth.custom.service";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";
import {ButtonDirective} from "primeng/button";
import {DockModule} from "primeng/dock";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe,
    ButtonDirective,
    DockModule,

  ],
})
export class ProfileComponent  implements OnInit{
  ngOnInit(): void {

  }



  userMe = inject (AuthService);

  constructor() {
  }


}
