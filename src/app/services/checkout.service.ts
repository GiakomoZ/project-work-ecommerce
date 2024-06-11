import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatiCheckout } from '../models/datiCliente';

@Injectable({
	providedIn: 'root',
})
export class CheckoutService {
	constructor(private http: HttpClient) {}

	// webhook: https://webhook.site/64646bd5-70e2-4875-9f09-2a37351cbbc3
	inviaOrdine(dati: DatiCheckout) {
		return this.http.post(
			'https://projectworkapi-z5nzzkwikq-oc.a.run.app/orders',
			dati
		);
	}
}
