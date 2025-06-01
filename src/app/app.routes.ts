import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateAlertComponent} from './create-alert/create-alert.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-alert', component: CreateAlertComponent }
];
