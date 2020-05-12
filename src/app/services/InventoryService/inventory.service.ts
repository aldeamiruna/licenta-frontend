import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Item from '../../models/Item';
import State from '../../models/State';
import ItemType from 'src/app/models/ItemType';
import Room from 'src/app/models/Room';
import User from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  fetchInventoryOrderedAsc(): Promise<Item[]> {
    return this.httpClient.get<Item[]>(`${InventoryService.API_URL}/items/all`)
      .toPromise();
  }

  fetchInventoryOrderedDesc(): Promise<Item[]> {
    return this.httpClient.get<Item[]>(`${InventoryService.API_URL}/items/allOrderedDesc`)
      .toPromise();
  }

  filterItemsByStatus(): Promise<Item[]> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('projectid', "THEPROJECT");
    let params = new HttpParams().set("status", "Available");
    return this.httpClient.get<Item[]>(`${InventoryService.API_URL}/items/filterByStatus`,
      { headers: headers, params: params }).toPromise();
  }

  fetchUserList() {
    return this.httpClient.get(`${InventoryService.API_URL}/users/`).toPromise();
  }

  deleteItem(targetId: number): Promise<Item> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('projectid', "THEPROJECT");
    return this.httpClient.delete<Item>(`${InventoryService.API_URL}/items/delete?targetId=${targetId}`,
      { headers: headers }).toPromise();
  }

  updateItem(item: Item) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('projectId', "THEPROJECT");
    return this.httpClient.put<Item>(`${InventoryService.API_URL}/items/update`, item,
      { headers: headers }).toPromise();
  }

  getItemStates(): Promise<State[]> {
    return this.httpClient.get<State[]>(`${InventoryService.API_URL}/states/`)
      .toPromise();
  }
  populateItemTypes(): Promise<ItemType[]> {
    return this.httpClient.get<ItemType[]>(`${InventoryService.API_URL}/types/distinctObjectTypes`)
      .toPromise();
  }
  populateRooms(): Promise<Room[]>{
    return this.httpClient.get<Room[]>(`${InventoryService.API_URL}/rooms/`)
      .toPromise();
  }
  populateUsers(): Promise<User[]>{
    return this.httpClient.get<User[]>(`${InventoryService.API_URL}/users/`)
      .toPromise();
  }
  getExistingSerialIds(): Promise<String[]> {
    return this.httpClient.get<String[]>(`${InventoryService.API_URL}/items/serialIds`)
      .toPromise();
  }
  getExistingItemStates(): Promise<State[]> {
    return this.httpClient.get<State[]>(`${InventoryService.API_URL}/states/itemStates`)
      .toPromise();
  }

  getExistingProducers(): Promise<String[]> {
    return this.httpClient.get<String[]>(`${InventoryService.API_URL}/items/producers`)
      .toPromise();
  }

  getExistingModels(): Promise<String[]> {
    return this.httpClient.get<String[]>(`${InventoryService.API_URL}/items/models`)
      .toPromise();
  }
  getExistingInventoryNumbers(): Promise<Number[]> {
    return this.httpClient.get<Number[]>(`${InventoryService.API_URL}/items/inventoryNumberList`)
      .toPromise();
  }

  customFilter(input: Item): Promise<Item[]> {

    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    return this.httpClient.post<Item[]>(`${InventoryService.API_URL}/items/customFind`,
      input, { headers: header }).toPromise();

  }

  // updateItemUser(item: Item) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.httpClient.put<Item>(`${InventoryService.API_URL}/items/update`, item,
  //     { headers: headers }).toPromise();
  // }

}
