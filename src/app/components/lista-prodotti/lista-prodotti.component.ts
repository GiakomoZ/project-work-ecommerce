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
	styleUrls: ['./lista-prodotti.component.css'],
})
export class ListaProdottiComponent implements OnInit {
	prodotti: Prodotto[] = [];
	nProdotti: number = 0;
	paginaCorrente: number = 0;
	pages: number[] = [];

	constructor(private productService: ProdottiService) {}

	loadProducts(page: number) {
		if (page != this.paginaCorrente) {
			this.productService
				.getPaginatedProducts(page)
				.subscribe((data: Prodotto[]) => {
					this.prodotti = data;
					this.paginaCorrente = page;

			window.scrollTo(0, 0);
				});
		}
	}

	loadPages() {
		this.pages = []; // Clear the array first
		for (let i = 1; i <= Math.ceil(this.nProdotti / 10); i++) {
			this.pages.push(i);
		}
	}

	ngOnInit(): void {
		this.loadProducts(1);
		this.productService.getProductsNumber().subscribe((data: number) => {
			this.nProdotti = data;
			this.loadPages(); // Call loadPages after nProdotti is set
		});
	}
}
