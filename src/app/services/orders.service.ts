import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatiCheckout } from '../models/datiCliente';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	// Array di numeri che contiene l'ID degli ordini salvati nel local storage
	storico: number[] = [];
	// URL dell'API per gli ordini
	apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/orders';

	// Costruttore del servizio che recupera i dati dal local storage
	constructor(private http: HttpClient, private ls: LocalStorageService) {
		this.storico = JSON.parse(this.ls.get('storico') || '[]');
	}

	// Restituisce l'array di ID degli ordini salvati nel local storage
	getStorico() {
		return this.storico;
	}

	// Salva l'array di ID degli ordini nel local storage
	saveToLS() {
		this.ls.save('storico', JSON.stringify(this.storico));
	}

	// Invia i dati di un ordine all'API e restituisce la risposta
	inviaOrdine(dati: DatiCheckout) {
		return this.http.post(this.apiUrl, dati);
	}

	// Restituisce i dati di un ordine specifico dall'API
	getOrdine(n: number) {
		return this.http.get<DatiCheckout>(this.apiUrl + '/' + n);
	}

	// Aggiunge un nuovo ID all'array degli ordini salvati e aggiorna il local storage
	salvaOrdine(id: number) {
		this.storico.push(id);
		this.saveToLS();
	}
}

