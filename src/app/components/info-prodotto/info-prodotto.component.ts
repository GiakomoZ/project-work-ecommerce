import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-info-prodotto',
	standalone: true,
	imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent],
	templateUrl: './info-prodotto.component.html',
	styleUrl: './info-prodotto.component.css',
})
export class InfoProdottoComponent {
	@Input() id: number = 1;
	@Input() titolo: string = '';
	@Input() prezzo: number = 0;
	@Input() immagini: string = '';
	@Input() categoria: string = '';
	@Input() rating: number = 0;
	@Input() descrizione: string = '';

	constructor(private productService: ProdottiService, private route: ActivatedRoute) {
		this.id = this.route.snapshot.params["id"];
		this.productService.getProduct(this.id).subscribe((data: Prodotto) => {
			this.titolo = data.title;
			this.prezzo = data.price;
			this.immagini = data.images;
			this.categoria = data.category.name;
			this.rating = data.stars;
			this.descrizione = data.description;
		});
	}
}
