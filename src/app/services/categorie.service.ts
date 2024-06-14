import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { categoriaRisposta } from '../models/categoriaRisposta';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CategorieService {
	// URL dell'API per le categorie
	apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/categories';
	
	// Costruttore del servizio, che prende in input l'oggetto HttpClient
	constructor(private http: HttpClient) {}
	
	// Metodo per ottenere tutte le categorie dall'API
	getAll() {
		// Invio della richiesta all'API per ottenere tutte le categorie e transformazione in un array di oggetti Categoria
		return this.http
			.get<categoriaRisposta>(this.apiUrl+`?pagesize=50`)
			.pipe(map((response: categoriaRisposta) => response.result));
	}
	
	// Metodo per ottenere una singola categoria dall'API
	// Restituisce un flusso di un solo oggetto Categoria
	getOne(id: number) {
		// Invio della richiesta all'API per ottenere una singola categoria
		return this.http.get<Categoria>(this.apiUrl + `/${id}`);
	}
}

