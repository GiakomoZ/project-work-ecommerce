import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottoRisposta } from '../models/ProdottoRisposta';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProdottiService {
	private apiUrl =
    'https://projectworkapi-z5nzzkwikq-oc.a.run.app/products?pagesize=50';
  private pagesizeDefault = 10;

	constructor(private http: HttpClient) {}

	getProducts() {
		return this.http
			.get<ProdottoRisposta>(this.apiUrl)
			.pipe(map((response: ProdottoRisposta) => response.result));
	}

	getPAginatedProducts(page: number) {
		return this.http
			.get<ProdottoRisposta>(
				this.apiUrl + `?page=${page}&pagesize=${this.pagesizeDefault}`
			)
			.pipe(map((response: ProdottoRisposta) => response.result));
	}
}
