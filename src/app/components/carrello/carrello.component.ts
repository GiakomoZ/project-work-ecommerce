import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrelloService } from '../../services/carrello.service';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { Carrello } from '../../models/carrello';
import { StoricoOrdiniComponent } from '../storico-ordini/storico-ordini.component';
@Component({
	selector: 'app-carrello',
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		CaroselloImmaginiComponent,
		StoricoOrdiniComponent
	],
	templateUrl: './carrello.component.html',
	styleUrl: './carrello.component.css',
})
export class CarrelloComponent {
	carrello: Carrello[] = [];
	constructor(public carrelloService: CarrelloService) {
		this.carrello = this.carrelloService.getItems();
	}
}
