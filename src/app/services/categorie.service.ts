import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { risposta } from '../models/rispostaApi';

@Injectable({
	providedIn: 'root',
})
export class CategorieService {
	apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/categories';
	constructor(private http: HttpClient) {}

	getAll() {
		return this.http.get<risposta>(this.apiUrl + `?pagesize=9999`);
	}

	//Categorie disponibili
	/* {
  "result": [
    {
      "id": 1,
      "name": "Abbigliamento",
      "image": "QkIa5tT.jpeg"
    },
    {
      "id": 2,
      "name": "Elettronica",
      "image": "ZANVnHE.jpeg"
    },
    {
      "id": 3,
      "name": "Mobili",
      "image": "Qphac99.jpeg"
    },
    {
      "id": 4,
      "name": "Scarpe",
      "image": "qNOjJje.jpeg"
    },
    {
      "id": 5,
      "name": "Varie",
      "image": "BG8J0Fj.jpg"
    }
  ],
   */

	getOne(id: number) {
		return this.http.get<Categoria>(this.apiUrl + `/${id}`);
	}
}
