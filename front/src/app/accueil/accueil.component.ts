import { Component } from '@angular/core';
import { Room } from '../model/room.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  rooms: Room[] = [
    { id: 1, name: 'Circuit de Monaco', description: 'Monaco', imageUrl: 'assets/images/monaco.jpg' },
    { id: 2, name: 'Circuit Bugatti', description: 'Le Mans - France', imageUrl: 'assets/images/mans.jpg' },
    { id: 3, name: 'Circuit Paul Ricard', description: 'Le Castellet - France', imageUrl: 'assets/images/france.jpg' },
    { id: 4, name: 'Circuit de Silverstone', description: 'Royaume-Uni', imageUrl: 'assets/images/silverstone.jpg' },
    { id: 5, name: 'Autodromo di Monza', description: 'Italie', imageUrl: 'assets/images/monza.jpg' },
    { id: 6, name: 'Circuit de Suzuka', description: 'Japon', imageUrl: 'assets/images/suzuka.jpg' },  ];
}
