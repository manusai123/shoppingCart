import { IProduct } from './products';

export interface CartState {
  loaded: boolean;
  products: IProduct[];
}
