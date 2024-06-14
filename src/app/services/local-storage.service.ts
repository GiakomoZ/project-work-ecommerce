import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	// Costruttore vuoto
	constructor() {}

	// Salva il valore specificato nel local storage con la chiave specificata
	save(key:string, value:string) {
		localStorage.setItem(key, value);
  }
  
  // Restituisce il valore associato alla chiave specificata nel local storage
	get(key:string) {
    return localStorage.getItem(key);
  }
}
