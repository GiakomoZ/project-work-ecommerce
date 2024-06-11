import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatiCheckout } from '../../models/datiCliente';
import { metodoPagamento } from '../../models/metodoPagamento';
import { OrdersService } from '../../services/orders.service';
import { CarrelloService } from '../../services/carrello.service';
import { OggettiComprati } from '../../models/oggettiComprati';
import { ToastrService } from 'ngx-toastr';
import { not } from 'rxjs/internal/util/not';

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
	switch: boolean = false;
	isSubmitted: boolean = false;
	datiPersonali: FormGroup = new FormGroup({
		nome: new FormControl<string>('', [Validators.required]),
		cognome: new FormControl<string>('', [Validators.required]),
		email: new FormControl<string>('', [
			Validators.required,
			Validators.email,
		]),
		indirizzo: new FormControl<string>('', [Validators.required]),
	});

	datiPagamento: FormGroup = new FormGroup({
		cardNumber: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^[0-9]{16}$'),
		]),
		cardHolder: new FormControl<string>('', [Validators.required]),
		expirationDate: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{2})$'),
		]),
		cvv: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^[0-9]{3}$'),
		]),
	});

	switchForm(): void {
		if (this.datiPersonali.valid) {
			this.switch = !this.switch;
		}
	}
	constructor(
		private checkoutService: OrdersService,
		private carrelloService: CarrelloService,
		private notify: ToastrService,
		private router: Router
	) {
		if (this.carrelloService.getItems().length <= 0) {
			notify.error('Non ci sono prodotti nel carrello');
			this.router.navigate(['/']);
		}
	}
	onSubmit() {
		let carta: metodoPagamento = {
			number: this.datiPagamento.get('cardNumber')?.value,
			ownerName: this.datiPagamento.get('cardHolder')?.value,
			expire: this.datiPagamento
				.get('expirationDate')
				?.value.replace(/\//g, ''),
			cvv: parseInt(this.datiPagamento.get('cvv')?.value),
		};
		let oggettiComprati: OggettiComprati[] =
			this.carrelloService.getItemsCheckout();
		let dati: DatiCheckout = {
			clientName:
				this.datiPersonali.get('nome')?.value +
				' ' +
				this.datiPersonali.get('cognome')?.value,
			address: this.datiPersonali.get('indirizzo')?.value,
			email: this.datiPersonali.get('email')?.value,
			totalPrice: this.carrelloService.getTotale(),
			payment: carta,
			details: oggettiComprati,
		};
		this.checkoutService.inviaOrdine(dati).subscribe(
			(response) => {
				this.notify.success(
					`Ordine numero ${response} inviato con successo`
				);
				this.checkoutService.salvaOrdine(Number(response));
				this.carrelloService.svuota();
				this.router.navigate(['/']);
			},
			(error) => {
				this.notify.error("Errore nell'invio dell'ordine");
			}
		);
		console.log(dati);
		console.log('submit!');
	}
}
