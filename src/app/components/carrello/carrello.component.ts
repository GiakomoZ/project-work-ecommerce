import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { CarrelloService } from '../../services/carrello.service';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { Carrello } from '../../models/carrello';
@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [RouterModule, CommonModule,ReactiveFormsModule, CaroselloImmaginiComponent],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent {
  carrello: Carrello[] = [];
  getCarrello() {
  this.carrello = this.carrelloService.getItems();
}
  constructor(public carrelloService: CarrelloService) 
  {
    this.getCarrello();
  }
}
