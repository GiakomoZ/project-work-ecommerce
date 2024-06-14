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

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
	// Flag per attivare o disattivare la visualizzazione del form di pagamento
	switch: boolean = false;
	
	// Flag per controllare se il modulo è stato effettivamente inviato
	isSubmitted: boolean = false;

	// FormGroup per i dati personali
	datiPersonali: FormGroup = new FormGroup({
		nome: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z\s']+$/)]),
		cognome: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z\s']+$/)]),
		email: new FormControl<string>('', [
			Validators.required,
			Validators.email,
		]),
		indirizzo: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s',.-/]+$/)]),
	});

	// FormGroup per i dati di pagamento
	datiPagamento: FormGroup = new FormGroup({
		// Numero della carta di credito
		cardNumber: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$'),
		]),
		// Nome del titolare della carta di credito
		cardHolder: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z\s']+$/)]),
		// Scadenza della carta di credito
		expirationDate: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
		]),
		// Codice di verifica della carta di credito
		cvv: new FormControl<string>('', [
			Validators.required,
			Validators.pattern('^[0-9]{3}$'),
		]),
	});

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

	// Funzione per attivare o disattivare il form di pagamento
	switchForm(): void {
		if (this.datiPersonali.valid) {
			this.switch = !this.switch;
		}
	}

	// Funzione per controllare il numero della carta di credito
	formatCardNumber(event: any): void {
		let input = event.target.value.replace(/\D/g, '');
		input = input.substring(0, 16);
		input = input.replace(/(\d{4})/g, '$1 ').trim();
		this.datiPagamento
			.get('cardNumber')
			?.setValue(input, { emitEvent: false });
	}

	// Funzione per controllare la data di scadenza della carta di credito
	formatExpirationDate(event: any): void {
		let input = event.target.value.replace(/\D/g, '');
		if (input.length >= 3) {
			input = `${input.substring(0, 2)}/${input.substring(2, 4)}`;
		}
		this.datiPagamento
			.get('expirationDate')
			?.setValue(input, { emitEvent: false });
	}

	// Funzione per controllare il codice di verifica della carta di credito
	formatCvv(event: any): void {
		let input = event.target.value.replace(/\D/g, '');
		input = input.substring(0, 3);
		this.datiPagamento
			.get('cvv')
			?.setValue(input, { emitEvent: false });
	}

	// Funzione per controllare il nome del cliente
	formatName(event: any): void {
		let input = event.target.value;
		input = input.replace(/[^a-zA-Z\s]/gi, '');
		this.datiPersonali
			.get('nome')
			?.setValue(input, { emitEvent: false });
	}

	// Funzione per inviare l'ordine
	onSubmit() {
		this.isSubmitted = true;
		if (this.datiPagamento.valid) {
		}
	}
}
