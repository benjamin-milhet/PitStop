import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isLoggedIn = false; 

  constructor() { }

  goToReservations() {
    // Code pour aller à la page des réservations
  }

  logout() {
    // Code pour gérer la déconnexion
  }

}

