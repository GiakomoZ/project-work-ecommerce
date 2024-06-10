import { CommonModule } from '@angular/common';
import { Component, Input, ModelFunction } from '@angular/core';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Prodotto } from '../../models/prodotto';
import { CarrelloService } from '../../services/carrello.service';

@Component({
	selector: 'app-card-prodotto',
	standalone: true,
	imports: [
		CommonModule,
		CaroselloImmaginiComponent,
		StelleRatingComponent,
		RouterModule,
	],
	templateUrl: './card-prodotto.component.html',
	styleUrl: './card-prodotto.component.css',
})
export class CardProdottoComponent {
	@Input() product: Prodotto | undefined = undefined;

	prodotto: Prodotto | undefined;

	constructor(private carrelloService: CarrelloService) {}

	addToCart() {
		if (this.product) this.carrelloService.addToCart(this.product);
	}
}
