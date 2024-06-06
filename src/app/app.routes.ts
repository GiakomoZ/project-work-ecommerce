import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ListaProdottiComponent } from './components/lista-prodotti/lista-prodotti.component';
import { CarrelloComponent } from './components/carrello/carrello.component';

export const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "shop", component: ListaProdottiComponent },
    {path:"carrello", component:CarrelloComponent},
    {path:"**", component:NotfoundComponent}
];
