import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoRisposta } from '../models/ProdottoRisposta';
import { map } from 'rxjs/operators';
import { Prodotto } from '../models/prodotto';

@Injectable({
	providedIn: 'root',
})
export class ProdottiService {
	private apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app';

	constructor(private http: HttpClient) {}

	// Get dei prodotti paginati con pagesize 10 che cambia la pagina
	getPaginatedProducts(page: number) {
		return this.http
			.get<ProdottoRisposta>(this.apiUrl + `/products?page=${page}`)
			.pipe(map((response: ProdottoRisposta) => response.result));
	}

	// Get di un singolo prodotto
	getProduct(id: number) {
		return this.http.get<Prodotto>(`${this.apiUrl}/products/${id}`);
	}

	//funzione per capire quanti prodotti ci sono in totale
	getProductsNumber() {
		return this.http
			.get<ProdottoRisposta>(this.apiUrl + '/products?pagesize=1')
			.pipe(
				map((response: ProdottoRisposta) => response.totalRecordsCount)
			);
	}
	getProductsNumberSearch(query: string, categoria: number) { 
		if (categoria !=0) {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/categories/${categoria}/products?search=${query}&&pagesize=1`
				)
				.pipe(map((response: ProdottoRisposta) => response.totalRecordsCount));
		} else {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/products?search=${query}&&pagesize=1`
				)
				.pipe(map((response: ProdottoRisposta) => response.totalRecordsCount));
		}
	}

	searchProducts(query: string, categoria: number, page: number) {
		if (categoria != 0) {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/categories/${categoria}/products?search=${query}&&pagesize=10&&page=${page}`
				)
				.pipe(map((response: ProdottoRisposta) => response.result));
		} else {
			return this.http
				.get<ProdottoRisposta>(
					`${this.apiUrl}/products?search=${query}&&pagesize=10&&page=${page}`
				)
				.pipe(map((response: ProdottoRisposta) => response.result));
		}
	}
}
