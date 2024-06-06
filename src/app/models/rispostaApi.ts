import { Categoria } from "./categoria";
import { Prodotto } from "./prodotto";

export interface risposta {
	result: (Categoria | Prodotto)[];
	totalRecordsCount: number;
}