import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carosello-immagini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carosello-immagini.component.html',
  styleUrl: './carosello-immagini.component.css'
})
export class CaroselloImmaginiComponent {
  @Input() id: number = 0;
  @Input() titolo: string = '';
  @Input() immagini: string = '';
}
