import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatiCheckout } from '../models/datiCliente';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	storico: number[] = [];
	apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/orders';
	constructor(private http: HttpClient, private ls: LocalStorageService) {
		this.storico = JSON.parse(this.ls.get('storico') || '[]');
	}

	getStorico() {
		return this.storico;
	}

	saveToLS() {
		this.ls.save('storico', JSON.stringify(this.storico));
	}

	inviaOrdine(dati: DatiCheckout) {
		return this.http.post(this.apiUrl, dati);
	}

	getOrdine(n: number) {
		return this.http.get<DatiCheckout>(this.apiUrl + '/' + n);
	}

	salvaOrdine(id: number) {
		this.storico.push(id);
		this.saveToLS();
	}
}

