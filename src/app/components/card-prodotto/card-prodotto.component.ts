import { CommonModule } from '@angular/common';
import { Component, Input, ModelFunction } from '@angular/core';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { RouterModule } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';

@Component({
	selector: 'app-card-prodotto',
	standalone: true,
	imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent, RouterModule],
	templateUrl: './card-prodotto.component.html',
	styleUrl: './card-prodotto.component.css',
})
export class CardProdottoComponent {
	@Input() id: number = 0;
	@Input() titolo: string = '';
	@Input() prezzo: number = 0;
	@Input() immagini: string = '';
	@Input() categoria: string = '';
	@Input() rating: number = 0;

	elementoDaAggiungere: number=0;	
	prodotto:Prodotto | undefined;

	getId(id: number) {
		this.elementoDaAggiungere=id;
		console.log(this.elementoDaAggiungere);
	}

	constructor(prodottoservice:ProdottiService) 
	{
		prodottoservice.getProduct(this.elementoDaAggiungere).subscribe(r=>this.prodotto=r);
	}

	
}


