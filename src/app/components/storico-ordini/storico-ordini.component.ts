import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { DatiCheckout } from '../../models/datiCliente';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-storico-ordini',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './storico-ordini.component.html',
	styleUrl: './storico-ordini.component.css',
})
export class StoricoOrdiniComponent {
	listaOrdini: DatiCheckout[] = [];
	constructor(private ordersService: OrdersService, private notify: ToastrService) {
		this.ordersService.getStorico().forEach((element) => {
			this.ordersService.getOrdine(element).subscribe({
				next: (data) => {
					this.listaOrdini.push(data);
        },
        error: (error) => {
          notify.error(error.error, "Errore nel caricamento dell'ordine");
        }
			});
		});
	}

	nProdotti(order:DatiCheckout):Number {
		return order.details.reduce((sum, item) => sum + item.quantity, 0);
	}
}
