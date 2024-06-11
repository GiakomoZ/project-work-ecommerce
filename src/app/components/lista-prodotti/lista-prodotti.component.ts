import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CommonModule } from '@angular/common';
import { CardProdottoComponent } from '../card-prodotto/card-prodotto.component';
import { ToastrService } from 'ngx-toastr';
import { ProdottoRisposta } from '../../models/ProdottoRisposta';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-lista-prodotti',
	standalone: true,
	imports: [CommonModule, CardProdottoComponent, RouterModule],
	templateUrl: './lista-prodotti.component.html',
	styleUrls: ['./lista-prodotti.component.css'],
})
export class ListaProdottiComponent implements OnInit {
	nProdPerPagina = 10;
	nProdotti = 0;
	nPagine = 0;
	paginaCorrente = 0;
	pages: number[] = [];
	choosenCat = 0;
	searchQuery = '';

	prodotti: Prodotto[] = [];

	categorie: Categoria[] = [];

	isSearch() {
		return this.searchQuery != '' || this.choosenCat != 0;
	}

	constructor(
		private productService: ProdottiService,
		private notify: ToastrService,
		private categorieService: CategorieService,
		private route: ActivatedRoute
	) {
		this.categorieService.getAll().subscribe({
			next: (data: Categoria[]) => (this.categorie = data),
			error: (e) =>
				this.notify.error('Errore nel caricamento delle categorie'),
		});
	}

	ngOnInit() {
		if (this.route.snapshot.queryParamMap.get('cat')) {
			this.choosenCat = Number(
				this.route.snapshot.queryParamMap.get('cat')
			);
			this.fetchProductCountSearch(this.searchQuery, this.choosenCat);
			this.loadProductsSearch(this.searchQuery, this.choosenCat, 1);
		} else {
			this.fetchProductCount();
			this.loadProducts(1);
		}
	}

	fetchProductCount() {
		this.productService.getProductsNumber().subscribe({
			next: (data: number) => {
				this.nProdotti = data;
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina);
				this.loadPages();
			},
			error: (e) =>
				this.notify.error('Errore nel caricamento dei prodotti'),
		});
	}
	fetchProductCountSearch(query: string, cat: number) {
		this.productService.getProductsNumberSearch(query, cat).subscribe({
			next: (data: number) => {
				this.nProdotti = data;
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina);
				this.loadPages();
			},
			error: (e) =>
				this.notify.error('Errore nel caricamento dei prodotti'),
		});
	}
	search(query: string, cat: string) {
		this.loadProductsSearch(query, Number(cat), 1);
	}
	loadProducts(page: number) {
		this.productService
			.getPaginatedProducts(page)
			.subscribe((data: Prodotto[]) => {
				this.prodotti = data;
				this.paginaCorrente = page;
				this.scrollToTop();
			});
	}
	loadProductsSearch(query: string, cat: number, page: number) {
		this.searchQuery = query;
		this.choosenCat = cat;
		this.fetchProductCountSearch(query, cat);
		this.productService
			.searchProducts(query, cat, page)
			.subscribe((data: Prodotto[]) => {
				this.prodotti = data;
				this.paginaCorrente = page;
				this.scrollToTop();
			});
	}

	//#region Paginazione
	goTo(page: number) {
		if (page > 0 && page <= this.nPagine) {
			if (this.isSearch()) {
				this.loadProductsSearch(
					this.searchQuery,
					this.choosenCat,
					page
				);
			} else {
				this.loadProducts(page);
			}
		}
	}
	switchPage(direction: number): void {
		const newPage = this.paginaCorrente + direction;
		if (newPage > 0 && newPage <= this.nPagine) {
			if (this.isSearch()) {
				this.loadProductsSearch(
					this.searchQuery,
					this.choosenCat,
					newPage
				);
			} else {
				this.loadProducts(newPage);
			}
		}
	}
	loadPages(): void {
		this.pages = Array.from({ length: this.nPagine }, (_, i) => i + 1);
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
	//#endregion
}
