import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CommonModule } from '@angular/common';
import { CardProdottoComponent } from '../card-prodotto/card-prodotto.component';

@Component({
	selector: 'app-lista-prodotti',
	standalone: true,
	imports: [CommonModule, CardProdottoComponent],
	templateUrl: './lista-prodotti.component.html',
	styleUrl: './lista-prodotti.component.css',
})
export class ListaProdottiComponent implements OnInit {
	prodotti: Prodotto[] = [];
	nProdotti: number = 0;
	pages: number[] = [];

	constructor(private productService: ProdottiService) { }
	
	loadProducts(page: number) {
		this.productService
			.getPaginatedProducts(page)
			.subscribe((data: Prodotto[]) => {
				this.prodotti = data;
			});
	}
	loadPages() {
		for(let i = 1; i <= Math.ceil(this.nProdotti / 10); i++) {
			this.pages.push(i);
		}
	}
	
	ngOnInit(): void {
		this.loadProducts(1);
		this.productService.getProductsNumber().subscribe((data: number) => {
			this.nProdotti = data;
		});
		this.loadPages();
	}

}
