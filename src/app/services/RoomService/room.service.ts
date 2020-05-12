import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Room from 'src/app/models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  
  fetchRooms(): Promise<Room[]>{
    return this.httpClient
      .get<Room[]>(`${RoomService.API_URL}/rooms/`)
      .toPromise();
  }
  fetchItemList(room: Room) {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    return this.httpClient.post(`${RoomService.API_URL}/rooms/getItems`, room, { headers: header }).toPromise();
  }

}
