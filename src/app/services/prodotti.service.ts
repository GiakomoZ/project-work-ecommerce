import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto';
import { risposta } from '../models/rispostaApi';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private apiUrl = 'https://example.com/api/products'; // Sostituisci con l'URL reale della tua API

  constructor(private http: HttpClient) {}

  getProducts() {
     return this.http.get<Prodotto[]>(this.apiUrl);
  }
}
