import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HistoryItemService {
  static readonly API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  fetchItemHistory(itemId: number) {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    let request = { "itemId": itemId }
    return this.httpClient.post(`${HistoryItemService.API_URL}/history/currentItem`, request, { headers: header }).toPromise();
  }
}
