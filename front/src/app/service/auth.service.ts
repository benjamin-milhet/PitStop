import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {StorageService} from "./storage.service";
import {User} from "../model/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  id : number,
  firstName : string,
  lastName : string,
  email : string,
  tel : string,
  roles : string[],
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/auth/login';
  private logoutUrl = 'http://localhost:8081/api/auth/logout';
  private refreshTokenURL = 'http://localhost:8081/api/auth/refresh-token';
  private infoUrl = 'http://localhost:8081/api/auth/info';
  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private storageService: StorageService, private router:Router) {}

  login(email : string, password: string) {
    return this.http.request<AuthResponseData>('post', this.loginUrl,
      {
        body: {email, password},
        withCredentials: true
      }).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        if (err.error.message === 'Bad credentials') {
          errorMessage = 'The email address or password you entered is invalid'
        }
        return throwError(() => new Error(errorMessage))
      }),
      tap(
        user => {
          console.log(user);
          const extractedUser: User = {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            tel: user.tel,
            role: {
              name: user.roles.find(role => role.includes('ROLE')) || '',
              permissions: user.roles.filter(permission => !permission.includes('ROLE'))
            }
          }
          this.storageService.saveUser(extractedUser);
          this.AuthenticatedUser$.next(extractedUser);
        }
      )
    );
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }

  logout(){
    this.http.request('post',this.logoutUrl,{
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/login']);
      }
    })
  }

  refreshToken(){
    return this.http.request('post', this.refreshTokenURL, {
      withCredentials: true
    })
  }
}
