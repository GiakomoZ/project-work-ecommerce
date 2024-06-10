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
	selector: 'app-dati-personali',
	standalone: true,
	imports: [RouterModule, ReactiveFormsModule, CommonModule],
	templateUrl: './dati-personali.component.html',
	styleUrl: './dati-personali.component.css',
})
export class DatiPersonaliComponent {
	isSubmitted: boolean = true;
	form: FormGroup = new FormGroup({
		nome: new FormControl<string>('', [Validators.required]),
		cognome: new FormControl<string>('', [Validators.required]),
		email: new FormControl<string>('', [
			Validators.required,
			Validators.email,
		]),
		indirizzo: new FormControl<string>('', [Validators.required]),
	});
	onSubmit(): void {
		this.isSubmitted = true;
		if (this.form.valid) {
			// Logica per l'invio del form
		}
	}

	
}
