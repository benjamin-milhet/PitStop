import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerURL = 'http://localhost:8081/register';

  constructor(private http: HttpClient) {}

  register(credentials: {firstName: string, lastName: string, tel: string, email: string; password: string }): Observable<any> {
    return this.http.post(this.registerURL, credentials);
  }}
