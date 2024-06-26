import { metodoPagamento } from './metodoPagamento';
import { OggettiComprati } from './oggettiComprati';

export interface DatiCheckout {
	clientName: string;
	address: string;
	email: string;
	totalPrice: number;
	payment: metodoPagamento|null;
	details: OggettiComprati[];
}
