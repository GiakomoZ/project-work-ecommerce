import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatiCliente } from '../../models/datiCliente';
import { metodoPagamento } from '../../models/metodoPagamento';
import { CheckoutService } from '../../services/checkout.service';

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterModule,],
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
			this.switch = true;
		}
  }
  constructor(private checkoutService: CheckoutService) {}
	onSubmit() {
		let carta: metodoPagamento = {
			number: this.datiPagamento.get('cardNumber')?.value,
			ownerName: this.datiPagamento.get('cardHolder')?.value,
			expire: this.datiPagamento.get('expirationDate')?.value,
			cvv: this.datiPagamento.get('cvv')?.value,
		};
		let dati: DatiCliente = {
			clientName: this.datiPersonali.get('nome')?.value,
			address: this.datiPersonali.get('indirizzo')?.value,
			totalPrice: 0,
			payment: carta,
		};
		this.checkoutService.inviaOrdine(dati).subscribe(
			(response) => {
				console.log('Risposta dal server:', response);
			},
			(error) => {
				console.error('Errore:', error);
			}
		);
		console.log(dati);
		console.log('submit!');
	}
}
