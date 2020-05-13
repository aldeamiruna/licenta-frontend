import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Item from '../../models/Item';
import { Observable } from 'rxjs';
import State from '../../models/State';
import ItemType from 'src/app/models/ItemType';
import User from 'src/app/models/User';
import UserStatus from 'src/app/models/UserStatus';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>(`/users`);
}

  getById(id: number) {
      return this.httpClient.get<User>(`/users/${id}`);
  }

  fetchInventoryOrderedAsc(): Promise<User[]> {
    return this.httpClient.get<User[]>(`${UserService.API_URL}/users/`)
      .toPromise();
  }
  updateStatusUser(user: User): Promise<User> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('projectid', "THEPROJECT");
    return this.httpClient.post<User>(`${UserService.API_URL}/users/update`, user,
      { headers: headers }).toPromise();
  }

  populateUserStates(): Promise<UserStatus[]> {
    return this.httpClient.get<UserStatus[]>(`${UserService.API_URL}/userStates/`)
      .toPromise();
  }
  fetchUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(`${UserService.API_URL}/users/all`)
      .toPromise();
  }

  filterUserByStatus(input: User): Promise<User[]> {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    return this.httpClient.post<User[]>(`${UserService.API_URL}/users/filterUsersByStatus`,
      input, { headers: header }).toPromise();

  }

}

