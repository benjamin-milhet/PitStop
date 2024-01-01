import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  roomId: number = 0;
  // Autres propriétés nécessaires

  constructor(
    private route: ActivatedRoute,
  ) {
    console.log('ReservationComponent constructor');
   }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.roomId);
    // Charger les détails de la salle ou les informations de réservation en utilisant roomId
  }

  // Autres méthodes du composant
}
