import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UserService} from "../user/user.service";
import {UserRequest} from "../model/user-request.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-organizer-event',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    ReactiveFormsModule,
    NgIf, MatButton
  ],
  templateUrl: './organizer-event.component.html',
  styleUrl: './organizer-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizerEventComponent implements OnInit{

  userForm: FormGroup;
  loading = false;
  authService = inject(AuthService)
  id = this.authService.currentUser$.value.id;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrganizerEventComponent>
  ) {
    this.userForm = this.fb.group({
      nombreComercial: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email2: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      empresa: ['', Validators.required],
      comentario: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const userRequest: UserRequest = this.userForm.value;

      this.userService.actualizarUsuario(this.id, userRequest).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Tus datos se enviaron con exito, en breve nos comunicaremos con usted', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(); // Cierra el diálogo
          this.userForm.reset();
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Error al enviar el formulario', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al enviar el formulario, por favor comunicate con un administrador:', error);
        },
      });
    }
  }

}
