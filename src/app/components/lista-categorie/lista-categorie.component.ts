import { Component } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { CardCategoriaComponent } from '../card-categoria/card-categoria.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-lista-categorie',
	standalone: true,
	imports: [CommonModule, CardCategoriaComponent],
	templateUrl: './lista-categorie.component.html',
	styleUrl: './lista-categorie.component.css',
})
export class ListaCategorieComponent {
	categorie: Categoria[] = [];
	constructor(
		private categorieService: CategorieService,
		private notify: ToastrService
	) {
		categorieService.getAll().subscribe({
			next: (data: Categoria[]) => (this.categorie = data),
			error: (e) =>
				notify.error('Errore nel caricamento delle categorie'),
		});
	}
}
