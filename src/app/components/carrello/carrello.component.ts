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

  

  

  increment(i: number) {
    
    this.carrello[i].quantita++;
  
}

  itemForm = new FormGroup({
    quantity: new FormControl<number>(1, [Validators.min(1)]),
    
  });

 

}
