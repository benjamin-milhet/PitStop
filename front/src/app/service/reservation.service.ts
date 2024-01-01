import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8081/api/auth/reservations'; // L'URL de votre API

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getReservationsForWeek(startOfWeek: Date): Observable<Reservation[]> {
    console.log('startOfWeek', startOfWeek);
    console.log(this.baseUrl + '/week');
    return this.http.post<Reservation[]>(this.baseUrl + '/week', startOfWeek);;
  }
}

interface Reservation {
  id: number;
  start: string; // ou Date, selon le format que vous utilisez
  endTime: string;   // ou Date, selon le format que vous utilisez
}
