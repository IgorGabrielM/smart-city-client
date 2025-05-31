import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Define a tela inicial como Home
  // { path: 'about', component: AboutComponent } // Exemplo de outra página
];
