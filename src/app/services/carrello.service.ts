import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { Carrello } from '../models/carrello';
import { OggettiComprati } from '../models/oggettiComprati';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  static addToCart(arg0: Prodotto) {
	  throw new Error('Method not implemented.');
  }

  private carrello: Carrello[] = [];

  saveToLS() {
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  addToCart(prodotto: Prodotto) {
    if (!this.carrello.find(e => e.prodotto.id == prodotto.id)) {
      this.carrello.push({prodotto: prodotto, quantita: 1});
    }else{
      this.carrello.find(e => e.prodotto.id == prodotto.id)!.quantita += 1;
    }
    this.saveToLS();
  }
 
  getItems() {
    return this.carrello;
  }

  getItemsCheckout(): OggettiComprati[]{
    return this.carrello.map(e => ({idProduct: e.prodotto.id, quantity: e.quantita}));
  }

  updateQuantity(prodotto: Prodotto, change: number) {
    if (change > 0) {
      this.carrello.find(e => e.prodotto.id == prodotto.id)!.quantita += 1;
    }
    else {
      if (this.carrello.find(e => e.prodotto.id == prodotto.id)!.quantita > 1)
        this.carrello.find(e => e.prodotto.id == prodotto.id)!.quantita -= 1;
    }
    this.saveToLS();
  }

  removeItem(prodotto: Prodotto) {
    const index = this.carrello.findIndex(e=>e.prodotto==prodotto);
    if (index > -1) {
      this.carrello.splice(index, 1);
    }
    this.saveToLS();
  }

  getTotale() {
    return this.carrello.reduce((sum, item) => sum + item.quantita * item.prodotto.price, 0);
  }

  constructor() {
    if (localStorage.getItem('carrello') != null) {
      this.carrello = JSON.parse(localStorage.getItem('carrello')!);
    }
  }
}
