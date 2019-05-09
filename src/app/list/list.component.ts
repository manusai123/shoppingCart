import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../products';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pageTitle = 'Angular store';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    if (!this.products.length) {
      this.productService.getProducts().subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => (this.errorMessage = <any>error)
      );
    }
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  removeProduct(product: IProduct): void {
    product.added = false;
    this.productService.removeProduct(product);
  }
  addProduct(product: IProduct): void {
    product.added = true;
    this.productService.addProduct(product);
  }
}
