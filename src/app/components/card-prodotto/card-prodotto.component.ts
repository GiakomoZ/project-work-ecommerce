import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';

@Component({
	selector: 'app-card-prodotto',
	standalone: true,
	imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent],
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
}
