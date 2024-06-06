import { Component } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-lista-categorie',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './lista-categorie.component.html',
	styleUrl: './lista-categorie.component.css',
})
export class ListaCategorieComponent {
	categorie: Categoria[] = [];
	constructor(private categorieService: CategorieService) {
		categorieService
			.getAll()
			.subscribe((data: Categoria[]) => (this.categorie = data));
	}
}
