import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-credit-card-form',
	standalone: true,
	imports: [RouterModule, ReactiveFormsModule, CommonModule],
	templateUrl: './pagamento.component.html',
	styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent {
	isSubmitted: boolean = false;
	form: FormGroup = new FormGroup({
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

	onSubmit(): void {
		this.isSubmitted = true;
		if (this.form.valid) {
			// Logica per l'invio del form
		}
	}
}
