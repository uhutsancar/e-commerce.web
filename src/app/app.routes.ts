import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ProductshApi } from '../data-access/products.api';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canMatch: [authGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('../components/products/products-routes'),
        canMatch: [authGuard],
    providers: [ProductshApi],

  },
 {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
 }
];
