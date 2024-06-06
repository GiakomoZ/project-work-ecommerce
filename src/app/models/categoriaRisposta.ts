import { Categoria } from './categoria';
import { Prodotto } from './prodotto';

export interface categoriaRisposta {
	result: Categoria[];
	totalRecordsCount: number;
}
