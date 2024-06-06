import { Component } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  
  constructor(private categorieService: CategorieService) {
    
  }
}
