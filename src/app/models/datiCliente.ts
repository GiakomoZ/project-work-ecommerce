import { metodoPagamento } from './metodoPagamento';

export interface DatiCliente {
	clientName: string;
	address: string;
	totalPrice: number;
	payment: metodoPagamento;
}
