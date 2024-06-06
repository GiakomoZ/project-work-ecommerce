import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { risposta } from '../models/rispostaApi';
import { ProductResponse } from '../models/productResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/products?pagesize=9999'; // Sostituisci con l'URL reale della tua API

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      map((response: ProductResponse) => response.result)
  )}
}
