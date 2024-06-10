import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { Carrello } from '../models/carrello';
import { ToastrService } from 'ngx-toastr';
import { ProdottiService } from './prodotti.service';

@Injectable({
	providedIn: 'root',
})
export class CarrelloService {
	static addToCart(arg0: Prodotto) {
		throw new Error('Method not implemented.');
	}

	private carrello: Carrello[] = [];

	saveToLS() {
		localStorage.setItem('carrello', JSON.stringify(this.carrello));
	}

	addToCart(id: number) {
		if (!this.carrello.find((e) => e.idProduct == id)) {
			this.carrello.push({ idProduct: id, quantity: 1 });
		} else {
			this.carrello.find(
				(e) => e.idProduct == id
			)!.quantity += 1;
		}
		this.saveToLS();
	}

	getItems() {
		return this.carrello;
	}

	updateQuantity(id: number, change: number) {
		if (change > 0) {
			this.carrello.find(
				(e) => e.idProduct == id
			)!.quantity += 1;
		} else {
			if (
				this.carrello.find((e) => e.idProduct == id)!
					.quantity > 1
			)
				this.carrello.find(
					(e) => e.idProduct == id
				)!.quantity -= 1;
		}
		this.saveToLS();
	}

	removeItem(id: number) {
		const index = this.carrello.findIndex(
			(e) => e.idProduct == id
		);
		if (index > -1) {
			this.carrello.splice(index, 1);
		}
		this.saveToLS();
	}

	getTotale() {
		let sum = 0;
		this.carrello.forEach((item) => {
			this.prodottoService.getProduct(item.idProduct).subscribe({
				next: (data: Prodotto) => {
					sum = data.price * item.quantity;
				},
				error: (e) =>
					this.notify.error('Errore nel caricamento del carrello'),
			});
		});

		return sum;
	}

	constructor(
		private notify: ToastrService,
		private prodottoService: ProdottiService
	) {
		if (localStorage.getItem('carrello') != null) {
			this.carrello = JSON.parse(localStorage.getItem('carrello')!);
		}
	}
}
