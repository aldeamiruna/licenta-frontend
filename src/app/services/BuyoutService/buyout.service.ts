import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Item from 'src/app/models/Item';

@Injectable({
  providedIn: 'root'
})
export class BuyoutService {

  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  fetchBuyoutItems(): Promise<Item[]>{
    return this.httpClient.get<Item[]>(`${BuyoutService.API_URL}/items/buyout`)
      .toPromise();
  }
}
