import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }
collapseNavbar() {
  const navbar = document.getElementById('navbarNavDropdown') as HTMLElement;
  navbar.classList.toggle('show');
}
}


