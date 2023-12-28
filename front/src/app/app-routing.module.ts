import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'reservation/:id', component: ReservationComponent },
  { path: '', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
