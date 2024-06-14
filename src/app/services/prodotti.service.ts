import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoRisposta } from '../models/ProdottoRisposta';
import { map } from 'rxjs/operators';
import { Prodotto } from '../models/prodotto';

@Injectable({
	providedIn: 'root',
})
export class ProdottiService {
	// URL dell'API
	private apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app';

	constructor(private http: HttpClient) {}

	// Get di un singolo prodotto
	getProduct(id: number) {
		return this.http.get<Prodotto>(`${this.apiUrl}/products/${id}`);
	}

	// Cerca prodotti tramite query e pagina
	searchProducts(query: string, categoria: number, page: number) {
		if (categoria != 0) {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/categories/${categoria}/products?search=${query}&&pagesize=10&&page=${page}`
				)
				.pipe(map((response: ProdottoRisposta) => response));
		} else {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/products?search=${query}&&pagesize=10&&page=${page}`
				)
				.pipe(map((response: ProdottoRisposta) => response));
		}
	}
}
