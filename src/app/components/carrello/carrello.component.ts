import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Carrello } from '../../models/carrello';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent {

  
  carrello: Carrello[] = [];


  constructor() {
    this.carrello = [
      {nome: 1, img: 'https://store.inter.it/dw/image/v2/BJBQ_PRD/on/demandware.static/-/Sites-inter-master-catalog/default/dwd2bbc5a2/images/large/23N001M4003_02.jpg?sw=1400&q=80', descrizione: 'descrizione1', tipo: 'tipo1', prezzo: (30),quantita:1},
      {nome: 2, img: 'https://store.acmilan.com/cdn/shop/products/765824-A18_01_800x.jpg?v=1657015003', descrizione: 'descrizione2', tipo: 'tipo2', prezzo: (20),quantita:2},
      {nome: 3, img: 'https://static.sscnapoli.it/img/p/6/9/7/7/6977-home_default.jpg', descrizione: 'descrizione3', tipo: 'tipo3', prezzo: (30),quantita:3},
    ];
  }


  

  increment(i: number) {
    
    this.carrello[i].quantita++;
  
}

  itemForm = new FormGroup({
    quantity: new FormControl<number>(1, [Validators.min(1)]),
    
  });

 

}
