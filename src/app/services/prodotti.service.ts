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
  private pagesizeDefault = 10;

	constructor(private http: HttpClient) {}

	getAll() {
		return this.http
			.get<ProdottoRisposta>(this.apiUrl + '?pagesize=50')
			.pipe(map((response: ProdottoRisposta) => response.result));
	}

	getPaginatedProducts(page: number) {
		return this.http
			.get<ProdottoRisposta>(
				this.apiUrl + `?page=${page}&pagesize=${this.pagesizeDefault}`
			)
			.pipe(map((response: ProdottoRisposta) => response.result));
  }
  
  getProduct(id: number) {
    return this.http.get<Prodotto>(this.apiUrl + `/${id}`);
  }
}
