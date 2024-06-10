import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { ActivatedRoute } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-info-prodotto',
	standalone: true,
	imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent,],
	templateUrl: './info-prodotto.component.html',
	styleUrl: './info-prodotto.component.css',
})
export class InfoProdottoComponent {
	id: number = 1;
	product: Prodotto | undefined = undefined;

	constructor(private productService: ProdottiService, private route: ActivatedRoute, private carrelloService:CarrelloService, private notify: ToastrService) {
		this.id = this.route.snapshot.params["id"];
		this.productService.getProduct(this.id).subscribe({
			next: (data: Prodotto) => {
				this.product = data;
			},
			error: (e) => notify.error('Errore nel caricamento del prodotto'),
		});
	}

	addToCart() {
		if(this.product) this.carrelloService.addToCart(this.product);
	}
}
