import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTableComponent} from "./user-table/user-table.component";
import {authGuard} from "../auth/Auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'user-table', pathMatch: 'full' },
  { path: 'user-table', component: UserTableComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
