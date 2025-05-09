import { Component, input, Pipe  } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../data-access/models/product';


@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [DecimalPipe, RouterLink, NgOptimizedImage],
})
export class ProductCardComponent {
   product = input.required<Product>();
  priority = input<boolean>(false);

  getDiscountedPrice(): number { 
    return +(this.product().price * (1 - this.product().discountPercentage / 100)).toFixed(2);
  }

  getStockStatus(): string { 
    return this.product().stock > 10 ? 'In Stock' : this.product().stock > 0 ? 'Low Stock' : 'Out of Stock';
  }
}