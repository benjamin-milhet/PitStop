import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AccueilComponent } from './accueil/accueil.component';
import {AppComponent} from "./app.component";
import {LoginFormComponent} from "./login-form/login-form.component";

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'reservation/:id', component: ReservationComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
