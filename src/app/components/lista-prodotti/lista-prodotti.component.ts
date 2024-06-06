import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-lista-prodotti',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './lista-prodotti.component.html',
	styleUrl: './lista-prodotti.component.css',
})
export class ListaProdottiComponent implements OnInit{
	prodotti: Prodotto[] = [];

	constructor(private productService : ProdottiService) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe((data: Prodotto[]) => {
			this.prodotti = data;
		});
	}
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
