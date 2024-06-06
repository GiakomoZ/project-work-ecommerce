import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { categoriaRisposta } from '../models/categoriaRisposta';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CategorieService {
	apiUrl = 'https://projectworkapi-z5nzzkwikq-oc.a.run.app/categories';
	constructor(private http: HttpClient) {}

  getAll() {
    return this.http
		.get<categoriaRisposta>(this.apiUrl+`?pagesize=50`)
		.pipe(map((response: categoriaRisposta) => response.result));
	}

	getOne(id: number) {
		return this.http.get<Categoria>(this.apiUrl + `/${id}`);
	}
}

