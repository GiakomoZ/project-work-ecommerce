import { Component, Input } from '@angular/core';
import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-elemento-carrello',
  standalone: true,
  imports: [CaroselloImmaginiComponent, CommonModule],
  templateUrl: './elemento-carrello.component.html',
  styleUrl: './elemento-carrello.component.css',
})
export class ElementoCarrelloComponent {
  @Input() id: number | undefined = undefined;
  @Input() quantita: number = 1;
  prodotto: Prodotto | undefined = undefined;

  constructor(
    private productService: ProdottiService,
    private notify: ToastrService,
    public carrelloService: CarrelloService
  ) {
    if (this.id) {
      this.productService.getProduct(this.id).subscribe({
        next: (data: Prodotto) => {
          this.prodotto = data;
        },
        error: (e) => notify.error('Errore nel caricamento del prodotto'),
      });
    }
  }
}
