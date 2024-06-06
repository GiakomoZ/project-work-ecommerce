import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-prodotto',
	standalone: true,
	imports: [CommonModule],
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

	getStarsArray(stars: number): any[] {
		const fullStars = Math.floor(stars);
		const halfStars = stars % 1 >= 0.5 ? 1 : 0;
		const emptyStars = 5 - fullStars - halfStars;

		const starsArray = [];

		for (let i = 0; i < fullStars; i++) {
			starsArray.push({ isFilled: true, isHalf: false });
		}

		if (halfStars === 1) {
			starsArray.push({ isFilled: false, isHalf: true });
		}

		for (let i = 0; i < emptyStars; i++) {
			starsArray.push({ isFilled: false, isHalf: false });
		}

		return starsArray;
	}
}
