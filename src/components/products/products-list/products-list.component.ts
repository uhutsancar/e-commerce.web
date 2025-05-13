import {
  Component,
  computed,
  inject,
  Injector,
  Input,
  PendingTasks,
  resource,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductshApi } from '../../../data-access/products.api';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../../data-access/models/product';
import {pendingUntilEvent} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  imports: [ProductCardComponent],
})
export class ProductsListComponent {
  #productsApi = inject(ProductshApi);
  products = signal<Product[]>([]);
  #injector = inject(Injector)

  ngOnInit(): void {
    this.#productsApi.getProducts()
    .pipe(
    pendingUntilEvent(this.#injector)
    )
    .subscribe((products) => {
      this.products.set(products);
    });
  }
}




