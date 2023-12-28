import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationTableComponent } from './reservation-table/reservation-table.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilComponent } from './accueil/accueil.component';

import '@angular/common/locales/global/fr';

@NgModule({

  declarations: [
    AppComponent,
    ReservationFormComponent,
    ReservationTableComponent,
    ReservationComponent,
    NavbarComponent,
    AccueilComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
