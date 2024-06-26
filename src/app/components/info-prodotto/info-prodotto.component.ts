import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-info-prodotto',
	standalone: true,
	imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent],
	templateUrl: './info-prodotto.component.html',
	styleUrls: ['./info-prodotto.component.css'],
})
export class InfoProdottoComponent {
	id: number = 1;
	product: Prodotto | undefined;

	constructor(
		private productService: ProdottiService,
		private route: ActivatedRoute,
		private carrelloService: CarrelloService,
		private notify: ToastrService,
		private router: Router
	) {
		const idParam = this.route.snapshot.params['id'];
		if (typeof idParam === 'string' && !isNaN(Number(idParam))) {
			this.id = Number(idParam);
			this.fetchProduct();
		} else {
			this.notify.error('URL non valido');
			this.router.navigate(['/shop']);
		}
	}

	private fetchProduct() {
		this.productService.getProduct(this.id).subscribe({
			next: (data: Prodotto) => (this.product = data),
			error: () =>
				{this.notify.error('Errore nel caricamento del prodotto');this.router.navigate(['/shop'])},
		});
	}

	addToCart() {
		if (this.product) {
			this.carrelloService.addToCart(this.product);
			this.notify.success('Prodotto aggiunto al carrello');
		}
	}
}
