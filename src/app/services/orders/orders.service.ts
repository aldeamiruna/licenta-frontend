import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  recordClicked;
  
  constructor(private httpClient: HttpClient) { }

  getUserOrder(userOder) {
    return this.httpClient.post(`/user/order`,userOder);
  }

}
