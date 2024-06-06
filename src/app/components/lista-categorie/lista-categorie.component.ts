import { Component } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { CardCategoriaComponent } from '../card-categoria/card-categoria.component';

@Component({
	selector: 'app-lista-categorie',
	standalone: true,
	imports: [CommonModule, CardCategoriaComponent],
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
