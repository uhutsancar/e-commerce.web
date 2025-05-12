import { Component, computed, inject,  Input,  resource } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductshApi } from '../../../data-access/products.api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  imports: [ProductCardComponent],
})
export class ProductsListComponent  {

  @Input() class = ''; // dışarıdan class alır

  #productsApi = inject(ProductshApi)
#productsResource = resource({
  loader: () => firstValueFrom(this.#productsApi.getProducts())
})

products = computed(() => this.#productsResource.value());
}
