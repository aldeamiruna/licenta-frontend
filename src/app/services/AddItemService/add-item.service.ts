import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Item from '../../models/Item';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  addItem(item: Item) {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    console.log(item);
    return this.httpClient.post(`${AddItemService.API_URL}/items/add`, item, { headers: header }).toPromise();
  }

  insertItemType(itemType) {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    console.log(itemType);
    return this.httpClient.put(`${AddItemService.API_URL}/types/insertItemType`, itemType, { headers: header }).toPromise();
  }

  fetchItemTypesList() {
    return this.httpClient.get(`${AddItemService.API_URL}/types/distinctObjectTypes`).toPromise();
  }

  fetchProducerList() {
    return this.httpClient.get(`${AddItemService.API_URL}/items/producers`).toPromise();
  }

  fetchModelList() {
    return this.httpClient.get(`${AddItemService.API_URL}/items/models`).toPromise();
  }

  fetchStatusList() {
    return this.httpClient.get(`${AddItemService.API_URL}/states/distinctObjectStates`).toPromise();
  }

  fetchRoomList() {
    return this.httpClient.get(`${AddItemService.API_URL}/rooms/`).toPromise();
  }

}