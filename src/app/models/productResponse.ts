import { Prodotto } from './prodotto';

export interface ProductResponse {
  result: Prodotto[];
  totalRecordsCount: number;
}