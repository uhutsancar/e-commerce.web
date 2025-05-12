import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ProductshApi } from '../data-access/products.api';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
       providers: [ProductshApi],
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'products',
    loadChildren: () => import('../components/products/products-routes'),
        canMatch: [authGuard],
    providers: [ProductshApi],

  },
 {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
 }
];
