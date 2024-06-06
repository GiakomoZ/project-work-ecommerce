import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-lista-prodotti',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './lista-prodotti.component.html',
	styleUrl: './lista-prodotti.component.css',
})
export class ListaProdottiComponent implements OnInit{
	prodotti: Prodotto[] = [];

	constructor(private productService : ProdottiService) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe((data: Prodotto[]) => {
			this.prodotti = data;
		});
	}
}
