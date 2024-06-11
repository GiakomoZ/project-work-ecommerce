import { metodoPagamento } from './metodoPagamento';
import { OggettiComprati } from './oggettiComprati';

export interface DatiCheckout {
	clientName: string;
	address: string;
	totalPrice: number;
	payment: metodoPagamento;
	details: OggettiComprati[];
}
