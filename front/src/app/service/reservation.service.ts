import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8081/api/user/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.request('get', this.baseUrl, {
      withCredentials: true,
      responseType : "text"
    });
  }

  getReservationsForWeek(startOfWeek: Date): Observable<Reservation[]> {
    console.log('startOfWeek', startOfWeek);
    console.log(this.baseUrl + '/week');
    return this.http.request<Reservation[]>('post', this.baseUrl + '/week', {
      body: startOfWeek,
      withCredentials: true,
    });
  }

}

interface Reservation {
  id: number;
  start: string; // ou Date, selon le format que vous utilisez
  endTime: string;   // ou Date, selon le format que vous utilisez
}
