import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})

export class ReservationTableComponent implements OnInit {
  currentWeek: Date[] = [];
  hours: number[] = [];
  reservations: {[key: string]: boolean} = {}; // Format: 'YYYY-MM-DD-HH': boolean

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(
      data => {
        console.log(data);
        this.initializeHours();
        this.goToWeek(new Date());
        //this.processReservationsData(data); // Traiter les données récupérées
      },
      error => console.error(error)
    );
  }

  processReservationsData(data: Reservation[]): void {
    this.reservations = {}; // Réinitialiser les réservations existantes

    data.forEach((reservation: Reservation) => {
      console.log(reservation);
      console.log(reservation.start);
      console.log(reservation.endTime);
      const startDate = new Date(Number(reservation.start[0]), Number(reservation.start[1]) - 1, Number(reservation.start[2]), Number(reservation.start[3]), Number(reservation.start[4]));
      const endDate = new Date(Number(reservation.endTime[0]), Number(reservation.endTime[1]) - 1, Number(reservation.endTime[2]), Number(reservation.endTime[3]), Number(reservation.endTime[4]));

      if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Date invalide:', reservation);
        return; // Ignorez cette réservation si la date est invalide
      }

      // Obtenir les heures de début et de fin
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      // Formater la date au format "YYYY-MM-DD"
      const dateKey = startDate.toISOString().split('T')[0];

      // Marquer toutes les heures entre startHour et endHour comme occupées
      for (let hour = startHour; hour <= endHour; hour++) {
        const key = `${dateKey}-${hour}`;
        this.reservations[key] = true;
        console.log(key);
      }
      console.log(this.reservations);
    });
  }

  initializeHours(): void {
    this.hours = Array.from({length: 13}, (_, i) => 8 + i); // Heures de 8 à 20
  }

  goToWeek(date: Date): void {
    const startOfWeek = this.getStartOfWeek(date);
    this.currentWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      this.currentWeek.push(day);
    }
    this.loadReservationsForWeek(startOfWeek);
  }

  loadReservationsForWeek(startOfWeek: Date): void {
    this.reservationService.getReservationsForWeek(startOfWeek).subscribe(
      data => {
        console.log(data);
        this.processReservationsData(data);
      },
      error => console.error(error)
    );
  }

  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay() || 7; // Dimanche = 7
    if (dayOfWeek !== 1)
      date.setHours(-24 * (dayOfWeek - 1));
    return date;
  }

  changeWeek(increment: number): void {
    const referenceDate = new Date(this.currentWeek[0]);
    referenceDate.setDate(referenceDate.getDate() + increment * 7);
    this.goToWeek(referenceDate);
  }

  isReserved(day: Date, hour: number): boolean {
    const key = `${day.getFullYear()}-${padTo2Digits(day.getMonth() + 1)}-${padTo2Digits(day.getDate())}-${hour}`;
    return this.reservations[key] || false;
  }
}

interface Reservation {
  id: number;
  start: string; // ou Date, selon le format que vous utilisez
  endTime: string;   // ou Date, selon le format que vous utilisez
}

function convertToValidDate(dateStr: string): Date {
  // Supprimez la partie des microsecondes et remplacez les espaces par des 'T' pour le format ISO
  console.log(dateStr);
  const validDateStr = dateStr.replace(' ', 'T').split('.')[0];
  return new Date(validDateStr);
}

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}
