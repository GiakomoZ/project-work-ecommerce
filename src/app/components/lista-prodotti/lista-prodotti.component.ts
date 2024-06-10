import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CommonModule } from '@angular/common';
import { CardProdottoComponent } from '../card-prodotto/card-prodotto.component';
import { ToastrService } from 'ngx-toastr';
import { ProdottoRisposta } from '../../models/ProdottoRisposta';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';

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
	nProdPerPagina: number = 10;
	nPagine: number = 0;
	paginaCorrente: number = 0;
	pages: number[] = [];
	categorie: Categoria[] | undefined;

	constructor(
		private productService: ProdottiService,
		private notify: ToastrService,
		private categorieService: CategorieService
	) {
		this.categorieService.getAll().subscribe({
			next: (data: Categoria[]) => (this.categorie = data),
			error: (e) =>
			this.notify.error('Errore nel caricamento delle categorie'),
		});
	 }

	ngOnInit(): void {
		this.loadProducts(1);
		this.fetchProductCount();
	}

	loadProducts(page: number): void {
		if (page !== this.paginaCorrente) {
			this.productService.getPaginatedProducts(page).subscribe({
				next: (data: Prodotto[]) => {
					this.prodotti = data;
					this.paginaCorrente = page;
					this.scrollToTop();
				},
				error: (e) => this.notify.error('Errore nel caricamento dei prodotti'),
			});
		} else {
			this.scrollToTop();
		}
	}

	fetchProductCount(): void {
		this.productService.getProductsNumber().subscribe({
			next: (data: number) => {
				this.nProdotti = data;
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina);
				this.loadPages();
			},
			error: (e) =>
				this.notify.error("Errore nell'ottenimento del numero di pagine"),
		});
	}

	loadPages(): void {
		this.pages = Array.from({ length: this.nPagine }, (_, i) => i + 1);
	}

	switchPage(direction: number): void {
		const newPage = this.paginaCorrente + direction;
		if (newPage > 0 && newPage <= this.nPagine) {
			this.loadProducts(newPage);
		}
	}

	private scrollToTop(): void {
		window.scrollTo(0, 0);
	}

	isFirstPage(): boolean {
		return this.paginaCorrente === 1;
	}

	isLastPage(): boolean {
		return this.paginaCorrente === this.nPagine;
	}


	search(nome: string,categoria:string): void {
		this.productService.searchProducts(nome,categoria).subscribe({
			next: (data: ProdottoRisposta) => {
				this.prodotti = data.result;
				this.nProdotti = data.totalRecordsCount;
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina);
				this.loadPages();
			},
			error: (e) => this.notify.error('Errore nel caricamento dei prodotti'),
		});
		console.log(this.prodotti);
	}

	
	
}
