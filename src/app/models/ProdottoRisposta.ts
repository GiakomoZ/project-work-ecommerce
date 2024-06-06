import { Prodotto } from './prodotto';

export interface ProdottoRisposta {
  result: Prodotto[];
  totalRecordsCount: number;
}