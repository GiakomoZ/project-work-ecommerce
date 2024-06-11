import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatiCheckout } from '../models/datiCliente';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	storico: number[] = []; // elenco degli id degli ordini inviati
	constructor(private http: HttpClient, private ls: LocalStorageService) {
		if (ls.get('storico') != null) {
			this.storico = JSON.parse(localStorage.getItem('storico')!);
		}
	}

	saveToLS() {
		this.ls.save('storico', JSON.stringify(this.storico));
	}


	inviaOrdine(dati: DatiCheckout) {
		return this.http.post(
			'https://projectworkapi-z5nzzkwikq-oc.a.run.app/orders',dati
		);
	}

	salvaOrdine(id: number) {
		this.storico.push(id);
		this.saveToLS();
	}
}
