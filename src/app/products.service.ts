import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from './products';
import { CartState } from './cartState';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productUrl = './assets/products.json';
  private cartSubject = new Subject<CartState>();
  products: IProduct[] = [];
  CartState = this.cartSubject.asObservable();
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map((products: IProduct[]) => products.find(p => p.productId === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addProduct(_product: any) {
    console.log('in service');
    this.products.push(_product);
    // this.cartSubject.next(<CartState>{ loaded: true, products: this.Products });
  }
  removeProduct(_product: any) {
    const index = this.products.indexOf(_product);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    // this.products = [];
  }
}
