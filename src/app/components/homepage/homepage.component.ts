import { Component } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { ListaCategorieComponent } from '../lista-categorie/lista-categorie.component';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [ListaCategorieComponent],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.css',
})
export class HomepageComponent {
}
