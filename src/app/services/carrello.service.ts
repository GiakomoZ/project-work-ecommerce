import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { Carrello } from '../models/carrello';
import { OggettiComprati } from '../models/oggettiComprati';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CarrelloService {
	private carrello: Carrello[] = [];

	saveToLS() {
		this.ls.save('carrello', JSON.stringify(this.carrello));
	}

	addToCart(prodotto: Prodotto) {
		if (!this.carrello.find((e) => e.prodotto.id == prodotto.id)) {
			this.carrello.push({ prodotto: prodotto, quantita: 1 });
		} else {
			this.carrello.find(
				(e) => e.prodotto.id == prodotto.id
			)!.quantita += 1;
		}
		this.saveToLS();
	}

	getItems() {
		return this.carrello;
	}

	getItemsCheckout(): OggettiComprati[] {
		return this.carrello.map((e) => ({
			idProduct: e.prodotto.id,
			quantity: e.quantita,
		}));
	}

	updateQuantity(prodotto: Prodotto, change: number) {
		const itemIndex = this.carrello.findIndex(
			(e) => e.prodotto.id === prodotto.id
		);
		if (itemIndex >= 0) {
			const item = this.carrello[itemIndex];
			item.quantita += change;
			if (item.quantita < 1) {
				this.carrello.splice(itemIndex, 1);
			}
			this.saveToLS();
		}
	}

	getTotale() {
		return this.carrello.reduce(
			(sum, item) => sum + item.quantita * item.prodotto.price,
			0
		);
	}

	svuota() {
		this.carrello = [];
		this.saveToLS();
	}

	constructor(private ls: LocalStorageService) {
		if (ls.get('carrello') != null) {
			this.carrello = JSON.parse(localStorage.getItem('carrello')!);
		}
	}
}
