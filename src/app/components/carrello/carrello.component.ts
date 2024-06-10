import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CarrelloService } from '../../services/carrello.service';
import { Prodotto } from '../../models/prodotto';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { Carrello } from '../../models/carrello';
import { ElementoCarrelloComponent } from '../elemento-carrello/elemento-carrello.component';

@Component({
	selector: 'app-carrello',
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
    CaroselloImmaginiComponent,
    ElementoCarrelloComponent
	],
	templateUrl: './carrello.component.html',
	styleUrl: './carrello.component.css',
})
export class CarrelloComponent {
	carrello: Carrello[] = [];

	getCarrello() {
		this.carrello = this.carrelloService.getItems();
	}

	constructor(public carrelloService: CarrelloService) {
		this.getCarrello();
	}
}
