import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  AuthUserSub! : Subscription;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) {
          this.isLoggedIn = user.role.name === 'ROLE_USER';
        }
      }
    })
  }

  goToReservations() {
    // Code pour aller à la page des réservations
  }

  logout() {
    // Code pour gérer la déconnexion
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }

}

