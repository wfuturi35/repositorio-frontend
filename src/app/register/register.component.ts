import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../user/user/user.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {CategoryService} from "../events/services/category.service";
import {UiService} from "../common/ui.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FieldErrorDirective} from "../user-controls/field-error.directive";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FieldErrorDirective,
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  categoriasSeleccionadas: number[] = [];
  emailErrorMessage: string = '';


  categorias = [
    { id: 1, name: 'Stand up' },
    { id: 2, name: 'Donación' },
    { id: 3, name: 'Música' },
    { id: 4, name: 'Deporte' },
    { id: 5, name: 'Danza' },
    { id: 6, name: 'Tecnología' },
    { id: 7, name: 'Arte & Cultura' },
    { id: 8, name: 'Comida & Bebidas' },
    { id: 9, name: 'Festivales' },
    { id: 10, name: 'Cine' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private categoriesService: CategoryService,
    private uiService: UiService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      fatherSurname: ['', Validators.required],
      matherSurname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleCategoria(id: number) {
    if (this.categoriasSeleccionadas.includes(id)) {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(catId => catId !== id);
    } else {
      this.categoriasSeleccionadas.push(id);
    }
  }

  enviarCategorias() {
    if (this.categoriasSeleccionadas.length >= 3) {
      this.categoriesService.setCategoriasSeleccionadas(this.categoriasSeleccionadas);
    } else {
      alert('Selecciona al menos 3 categorías');
    }
  }

  ngOnInit(): void {

  }

  clearEmailError(): void {
    this.emailErrorMessage = ''; // Limpiar el mensaje de error al escribir
  }

  checkEmail(): void {
    const emailControl = this.registerForm.get('email');
    const email = emailControl?.value;

    this.userService.checkEmail(email).subscribe((response) => {
      if (response === 'Email disponible') {
        this.emailErrorMessage = '';
        this.uiService.showToast('El email está disponible');
      } else {
        this.emailErrorMessage = 'El correo ya está registrado o ocurrió un error';
        emailControl?.markAsTouched();
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.emailErrorMessage) {
      this.userService.register(this.registerForm.value).subscribe({
        next: () => {
          this.uiService.showDialog('Registro exitoso', 'Usted se ha registrado correctamente');
          this.router.navigate(['/login']); // Redirect to login
        },
        error: (error) => {
          this.uiService.showToast('El correo ya está registrado o ocurrió un error');
        }
      });
    }
  }
}
