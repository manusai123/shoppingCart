import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  loaded = true;
  products: IProduct[];
  constructor(private cartService: ProductsService) {
    console.log('constructor');
  }

  ngOnInit() {
    this.products = this.cartService.products;
    console.log('ngOnInit');
  }

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      sum += this.products[i].price;
    }
    return parseFloat(sum.toFixed(2));
  }
}
