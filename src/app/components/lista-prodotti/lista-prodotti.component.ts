import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardProdottoComponent } from '../card-prodotto/card-prodotto.component';
import { ProdottoRisposta } from '../../models/ProdottoRisposta';

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
	paginaCorrente = 1;
	pages: number[] = [];
	choosenCat = 0;
	searchQuery = '';

	prodotti: Prodotto[] = [];

	categorie: Categoria[] = [];

	constructor(
		private productService: ProdottiService,
		private notify: ToastrService,
		private categorieService: CategorieService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.loadCategories();
	}

	ngOnInit() {
		this.choosenCat =
			Number(this.route.snapshot.queryParamMap.get('cat')) || 0;
		this.loadProducts(this.paginaCorrente);
	}

	loadCategories() {
		this.categorieService.getAll().subscribe({
			next: (data: Categoria[]) => (this.categorie = data),
			error: (e) =>
				this.notify.error('Errore nel caricamento delle categorie'),
		});
	}

	switchCategory(cat: string) {
		this.choosenCat = Number(cat);
		this.router.navigateByUrl('/shop?cat='+this.choosenCat)
		this.loadProducts(this.paginaCorrente,"",cat);
	}

	loadProducts(page: number, query: string = '', cat: string = '') {
		

		this.searchQuery = query;
		if (cat === '') {
			cat = String(this.choosenCat);
		} else {
			this.choosenCat = Number(cat);
		}
		const categoria = Number(cat);
		this.productService.searchProducts(query, categoria, page).subscribe({
			next: (data: ProdottoRisposta) => {
				this.prodotti = data.result;
				this.nProdotti = data.totalRecordsCount;
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina);
				this.pages = Array.from(
					{ length: this.nPagine },
					(_, i) => i + 1
				);
			},
			error: (e) =>
				this.notify.error('Errore nel caricamento dei prodotti'),
		});
	}

	//#region paginazione
	goTo(page: number) {
		if (page > 0 && page <= this.nPagine) {
			this.paginaCorrente = page;
			this.loadProducts(page);
			this.scrollToTop();
		}
	}

	isFirstPage(): boolean {
		return this.paginaCorrente === 1;
	}

	isLastPage(): boolean {
		return this.paginaCorrente === this.nPagine;
	}

	switchPage(step: number) {
		this.goTo(this.paginaCorrente + step);
	}

	scrollToTop() {
		window.scrollTo(0, 0);
	}
	//#endregion
}
