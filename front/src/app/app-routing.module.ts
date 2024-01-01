import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AccueilComponent } from './accueil/accueil.component';
import {LoginFormComponent} from "./login-form/login-form.component";
import {authGuard} from "./helpers/auth.guard";
import {AccessDeniedComponent} from "./errors/access-denied/access-denied.component";

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginFormComponent
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [authGuard],
    data: {roles: ['ROLE_USER, ROLE_ADMIN']}
  },
  {
    path: 'reservation/:id',
    component: ReservationComponent,
    canActivate: [authGuard],
    data: {roles: ['ROLE_USER, ROLE_ADMIN']}
  },
  /*{
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: {roles: ['ROLE_ADMIN']}
  },*/
  {
    path: 'forbidden',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
