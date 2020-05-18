import { Injectable } from '@angular/core';
import { Product } from '../shop-products';

export class DbProduct {
  product:string;
  details:string;
  value:number;
}

export class DbUserOrder {
  username:string;
  orderProducts:DbProduct[]=[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Product[]=[];
  constructor() { }
}
