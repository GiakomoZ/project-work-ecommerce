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

	// Metodo chiamato quando il componente viene creato
	ngOnInit() {
		// parametro 'cat' dalla route convertito in numero, altrimenti imposto a 0
		this.choosenCat =
			Number(this.route.snapshot.queryParamMap.get('cat')) || 0;

		// Carico i prodotti con la pagina corrente
		this.loadProducts(this.paginaCorrente);
	}

	// Carica le categorie dal servizio
	loadCategories() {
		this.categorieService.getAll().subscribe({

			// Metodo chiamato quando viene ricevuto la risposta dal servizio
			next: (data: Categoria[]) => (this.categorie = data), // Assegno le categorie ricevute

			// Metodo chiamato quando si verifica un errore durante la chiamata al servizio
			error: (e) =>
				this.notify.error('Errore nel caricamento delle categorie'), // Mostro un messaggio di errore
		});
	}

	// Cambia la categoria selezionata
	switchCategory(cat: string) {
		this.choosenCat = Number(cat); // categoria in numero
		this.router.navigateByUrl('/shop?cat='+this.choosenCat); // Reindirizzs all'url di base con il parametro 'cat'
		this.loadProducts(1,"",cat); // Carics i prodotti con la categoria selezionata
	}

	// Carica i prodotti in base alla pagina, query e categoria
	loadProducts(page: number, query: string = '', cat: string = '') {
		

		this.searchQuery = query; // Assegno la query di ricerca
		if (cat === '') {
			cat = String(this.choosenCat); // Se la categoria non è specificata, uso quella corrente
		} else {
			this.choosenCat = Number(cat); // Altrimenti converto la categoria in numero
		}
		const categoria = Number(cat); // Converto la categoria in numero
		this.productService.searchProducts(query, categoria, page).subscribe({
			// Metodo chiamato quando viene ricevuto la risposta dal servizio
			next: (data: ProdottoRisposta) => {
				this.prodotti = data.result; // Assegno i prodotti ricevuti
				this.nProdotti = data.totalRecordsCount; // Assegno il numero totale di prodotti
				this.nPagine = Math.ceil(this.nProdotti / this.nProdPerPagina); // Calcolo il numero totale di pagine
				this.pages = Array.from(
					{ length: this.nPagine },
					(_, i) => i + 1
				); // Creo un array con le pagine
			},
			// Metodo chiamato quando si verifica un errore durante la chiamata al servizio
			error: (e) =>
				this.notify.error('Errore nel caricamento dei prodotti'), // Mostro un messaggio di errore
		});
	}

	//#region Metodi di paginazione
	// Vai alla pagina specificata
	goTo(page: number) {
		if (page > 0 && page <= this.nPagine) { // Verifico che la pagina sia valida
			this.paginaCorrente = page; // Assegno la pagina corrente
			this.loadProducts(page); // Carico i prodotti con la pagina specificata
			this.scrollToTop(); // Torno in alto della pagina
		}
	}

	// Verifica se sia la prima pagina
	isFirstPage(): boolean {
		return this.paginaCorrente === 1; // Ritorno true se la pagina corrente è 1
	}

	// Verifica se sia l'ultima pagina
	isLastPage(): boolean {
		return this.paginaCorrente === this.nPagine; // Ritorno true se la pagina corrente è uguale al numero totale di pagine
	}

	// Vai alla pagina successiva o precedente
	switchPage(step: number) {
		this.goTo(this.paginaCorrente + step); // Vado alla pagina corrente più lo step specificato
	}

	// Torna in alto della pagina
	scrollToTop() {
		window.scrollTo(0, 0); // Torno in alto della pagina
	}
	//#endregion
}
