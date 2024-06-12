import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-stelle-rating',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './stelle-rating.component.html',
	styleUrl: './stelle-rating.component.css',
})
export class StelleRatingComponent {
	@Input() rating: number = 0;
	getStarsArray(stars: number): any[] {
		const fullStars = Math.floor(stars);
		const halfStars = stars % 1 >= 0.5 ? 1 : 0;

		const starsArray = [];

		for (let i = 0; i < fullStars; i++) {
			starsArray.push({ isFilled: true, isHalf: false });
		}

		if (halfStars === 1) {
			starsArray.push({ isFilled: false, isHalf: true });
		}

		return starsArray;
	}
}
