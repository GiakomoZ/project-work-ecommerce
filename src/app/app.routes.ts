import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ListaProdottiComponent } from './components/lista-prodotti/lista-prodotti.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { InfoProdottoComponent } from './components/info-prodotto/info-prodotto.component';
import { AboutComponent } from './components/about/about.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'shop', component: ListaProdottiComponent },
	{ path: 'shop/:id', component: InfoProdottoComponent },
	{ path: 'carrello', component: CarrelloComponent },
	{ path: 'carrello/checkout', component: CheckoutComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '**', component: NotfoundComponent },
];
