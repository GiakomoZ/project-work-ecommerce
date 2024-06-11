import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotto } from '../../models/prodotto';
import { CarrelloService } from '../../services/carrello.service';
import { ToastrService } from 'ngx-toastr';

import { CaroselloImmaginiComponent } from '../carosello-immagini/carosello-immagini.component';
import { StelleRatingComponent } from '../stelle-rating/stelle-rating.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-prodotto',
  standalone: true,
  imports: [CommonModule, CaroselloImmaginiComponent, StelleRatingComponent,RouterModule],
  templateUrl: './card-prodotto.component.html',
  styleUrls: ['./card-prodotto.component.css'],
})
export class CardProdottoComponent {
  @Input() product!: Prodotto;

  constructor(private carrelloService: CarrelloService, private notify: ToastrService) {}

  addToCart() {
    if (this.product) {
      this.carrelloService.addToCart(this.product);
      this.notify.success('Prodotto aggiunto al carrello');
    }
  }
}

