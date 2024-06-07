import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoRisposta } from '../models/ProdottoRisposta';
import { map } from 'rxjs/operators';
import { Prodotto } from '../models/prodotto';

@Injectable({
	providedIn: 'root',
})
export class ProdottiService {
	private apiUrl =
    'https://projectworkapi-z5nzzkwikq-oc.a.run.app/products';

	constructor(private http: HttpClient) {}

	// Get di tutti i prodotti
	getAll() {
		return this.http
			.get<ProdottoRisposta>(this.apiUrl + '?pagesize=50')
			.pipe(map((response: ProdottoRisposta) => response.result));
	}

	// Get dei prodotti paginati con pagesize 10 che cambia la pagina
	getPaginatedProducts(page: number) {
		return this.http
			.get<ProdottoRisposta>(
				this.apiUrl + `?page=${page}`
			)
			.pipe(map((response: ProdottoRisposta) => response.result));
  }
  
  // Get di un singolo prodotto
  getProduct(id: number) {
    return this.http.get<Prodotto>(this.apiUrl + `/${id}`);
  }

  //funzione per capire quanti prodotti ci sono in totale
  getProductsNumber() {
    return this.http.get<ProdottoRisposta>(this.apiUrl + '?pagesize=1').pipe(
      map((response: ProdottoRisposta) => response.totalRecordsCount)
    );
  }
}
