import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Item from 'src/app/models/Item';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  fetchDatasetByStatus(): Promise<Number[]>{
    return this.httpClient.get<Number[]>(`${DashboardService.API_URL}/items/getDataset/state`)
      .toPromise();
  }

  fetchRecentAssets():Promise<Item[]>{
    return this.httpClient.get<Item[]>(`${DashboardService.API_URL}/items/recentAssets`)
    .toPromise();
  }

}
