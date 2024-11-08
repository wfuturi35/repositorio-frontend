import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/user/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {CurrencyPipe, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {UserResponse} from "../../user/model/user-response.model";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    Button,
    FileUploadModule,
    TableModule,
    CurrencyPipe,
    RatingModule,
    PaginatorModule,
    TagModule,
    DialogModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ChipsModule,
    NgIf,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit{

  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  displayDialog: boolean = false;
  selectedUser: UserResponse | null = null;
  selectedRole: string = '';
  roles: string[] = ['USER', 'MANAGER', 'ADMIN'];

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllSolicitudRol().then((users: UserResponse[]) => {
      this.users = users;
      this.filteredUsers = users; // Inicialmente, todos los usuarios se muestran
    });
  }

  filterUsers(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(user => user.fullName.toLowerCase().includes(query));
  }

  showDialog(user: UserResponse): void {
    this.selectedUser = user; // Guarda el usuario seleccionado
    this.selectedRole = ''; // Reinicia el rol seleccionado
    this.displayDialog = true;
  }

  addRole(userId: number | undefined, roleName: string) {
    this.userService.addRole(userId, roleName).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol agregado correctamente!' });
        this.displayDialog = false; // Cerrar el diálogo
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el rol.' });
      }
    );
  }
}
