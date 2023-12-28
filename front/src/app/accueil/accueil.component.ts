import { Component } from '@angular/core';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  rooms: Room[] = [
    { id: 1, name: 'Salle 1', description: 'Description de la Salle 1', imageUrl: 'assets/images/img1.jpeg' },
    { id: 2, name: 'Salle 2', description: 'Description de la Salle 2', imageUrl: 'assets/images/img1.jpeg' },
    { id: 3, name: 'Salle 3', description: 'Description de la Salle 3', imageUrl: 'assets/images/img1.jpeg' },
    { id: 4, name: 'Salle 4', description: 'Description de la Salle 4', imageUrl: 'assets/images/img1.jpeg' },
    { id: 5, name: 'Salle 5', description: 'Description de la Salle 5', imageUrl: 'assets/images/img1.jpeg' },
    { id: 6, name: 'Salle 6', description: 'Description de la Salle 6', imageUrl: 'assets/images/img1.jpeg' },  ];
}
