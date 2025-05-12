import { Component, inject, OnInit } from '@angular/core';

import { Product } from '../../data-access/models/product';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { NgFor } from '@angular/common';
import { ProductsListComponent } from "../products/products-list/products-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ ProductsListComponent],
})
export class HomeComponent implements OnInit {



  constructor() {}



  ngOnInit() {
   
  }
}