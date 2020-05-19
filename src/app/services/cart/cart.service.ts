import { Injectable } from '@angular/core';
import { Product } from '../shop-products';
import { HttpClient } from '@angular/common/http';

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
  constructor(private httpClient: HttpClient) { }

  saveOrder(order: DbUserOrder) {
    return this.httpClient.post(`/save/order`, order);
  }
}
