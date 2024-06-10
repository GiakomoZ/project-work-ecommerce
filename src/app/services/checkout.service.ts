import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatiCliente } from '../models/datiCliente';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  inviaOrdine(dati:DatiCliente) {
    return this.http.post<any>(
		'https://webhook.site/64646bd5-70e2-4875-9f09-2a37351cbbc3',
		dati
	);
  }
}
