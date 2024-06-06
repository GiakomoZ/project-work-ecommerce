import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-card-categoria',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './card-categoria.component.html',
	styleUrl: './card-categoria.component.css',
})
export class CardCategoriaComponent {
  @Input() id: number = 0;
	@Input() nome: string = '';
	@Input() image: string = '';
}
