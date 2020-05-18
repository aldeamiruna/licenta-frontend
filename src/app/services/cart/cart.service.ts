import { Injectable } from '@angular/core';
import { Product } from '../shop-products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Product[]=[];
  constructor() { }
}
