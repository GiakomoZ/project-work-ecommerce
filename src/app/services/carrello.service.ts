import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { Carrello } from '../models/carrello';
import { OggettiComprati } from '../models/oggettiComprati';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CarrelloService {
	// Array di oggetti Carrello
	private carrello: Carrello[] = [];

	// Salva il carrello nel local storage
	saveToLS() {
		this.ls.save('carrello', JSON.stringify(this.carrello));
	}

	// Aggiunge un prodotto al carrello, se già presente ne aumenta la quantità
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

	// Restituisce il carrello
	getItems() {
		return this.carrello;
	}

	// Restituisce il numero di elementi nel carrello
	getItemsCount() {
		return this.carrello.reduce((sum, item) => sum + item.quantita, 0);
	}

	// Restituisce i prodotti selezionati per la checkout
	getItemsCheckout(): OggettiComprati[] {
		return this.carrello.map((e) => ({
			idProduct: e.prodotto.id,
			quantity: e.quantita,
		}));
	}

	// Aggiorna la quantità di un prodotto nel carrello e lo rimuove se la quantità è <= 0
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

	// Rimuove un prodotto dal carrello
	removeItem(prodotto: Prodotto) {
		const index = this.carrello.findIndex((e) => e.prodotto == prodotto);
		if (index > -1) {
			this.carrello.splice(index, 1);
		}
		this.saveToLS();
	}

	// Restituisce il totale del carrello
	getTotale() {
		return this.carrello.reduce(
			(sum, item) => sum + item.quantita * item.prodotto.price,
			0
		);
	}

	// Svuota il carrello
	svuota() {
		this.carrello = [];
		this.saveToLS();
	}

	// Costruttore che carica il carrello dal local storage
	constructor(private ls: LocalStorageService) {
		this.carrello = JSON.parse(this.ls.get('carrello') || '[]');
	}
}

