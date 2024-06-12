import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  switch: boolean = false;
  isSubmitted: boolean = false;
  datiPersonali: FormGroup = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    cognome: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    indirizzo: new FormControl<string>('', [Validators.required]),
  });

  datiPagamento: FormGroup = new FormGroup({
    cardNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$'),
    ]),
    cardHolder: new FormControl<string>('', [Validators.required]),
    expirationDate: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
    ]),
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

  switchForm(): void {
    if (this.datiPersonali.valid) {
      this.switch = !this.switch;
    }
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    input = input.substring(0, 16);
    input = input.replace(/(\d{4})/g, '$1 ').trim();
    this.datiPagamento.get('cardNumber')?.setValue(input, { emitEvent: false });
  }

  formatExpirationDate(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 3) {
      input = `${input.substring(0, 2)}/${input.substring(2, 4)}`;
    }
    this.datiPagamento.get('expirationDate')?.setValue(input, { emitEvent: false });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.datiPagamento.valid) {
      let carta: metodoPagamento = {
        number: this.datiPagamento.get('cardNumber')?.value.replace(/\s/g, ''),
        ownerName: this.datiPagamento.get('cardHolder')?.value,
        expire: this.datiPagamento.get('expirationDate')?.value.replace(/\//g, ''),
        cvv: parseInt(this.datiPagamento.get('cvv')?.value),
      };
      let oggettiComprati: OggettiComprati[] = this.carrelloService.getItemsCheckout();
      let dati: DatiCheckout = {
        clientName: `${this.datiPersonali.get('nome')?.value} ${this.datiPersonali.get('cognome')?.value}`,
        address: this.datiPersonali.get('indirizzo')?.value,
        email: this.datiPersonali.get('email')?.value,
        totalPrice: this.carrelloService.getTotale(),
        payment: carta,
        details: oggettiComprati,
      };
      this.checkoutService.inviaOrdine(dati).subscribe({
        next: (response) => {
          this.notify.success(`Ordine numero ${response} inviato con successo`);
          this.checkoutService.salvaOrdine(Number(response));
          this.carrelloService.svuota();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notify.error("Errore nell'invio dell'ordine");
        }
      });
    } else {
      this.notify.error('Per favore, completa tutti i campi obbligatori.');
    }
  }
}
