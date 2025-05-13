import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { delay, map, Observable, tap } from 'rxjs';

export interface GetProductsResponse {
  products: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductshApi {
  http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http
      .get<GetProductsResponse>(`products`)
      .pipe(map((m) => m.products));
   
  }



}
