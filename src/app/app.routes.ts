import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ListaProdottiComponent } from './components/lista-prodotti/lista-prodotti.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { DatiPersonaliComponent } from './components/dati-personali/dati-personali.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { InfoProdottoComponent } from './components/info-prodotto/info-prodotto.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'shop', component: ListaProdottiComponent },
	{ path: 'shop/:id', component: InfoProdottoComponent },
	{ path: 'carrello', component: CarrelloComponent },
	{ path: 'checkout', component: DatiPersonaliComponent },
	{ path: 'pagamento', component: PagamentoComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '**', component: NotfoundComponent },
];
