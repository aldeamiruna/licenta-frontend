import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  static readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  addUser(user: User) {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    console.log(user);
    return this.httpClient.post(`${AddUserService.API_URL}/users/add`, user, { headers: header }).toPromise();
  }

  fetchCompanyIds() {
    return this.httpClient.get(`${AddUserService.API_URL}/users/companyIds`).toPromise();
  }

  fetchLastNameList() {
    return this.httpClient.get(`${AddUserService.API_URL}/users/lastNameList`).toPromise();
  }

  fetchFirstNameList() {
    return this.httpClient.get(`${AddUserService.API_URL}/users/firstNameList`).toPromise();
  }

  fetchStatusList() {
    return this.httpClient.get(`${AddUserService.API_URL}/userStates/`).toPromise();
  }

  fetchUserList() {
    return this.httpClient.get(`${AddUserService.API_URL}/users/`).toPromise();
  }

  fetchEmailList() {
    return this.httpClient.get(`${AddUserService.API_URL}/users/emailList`).toPromise();
  }

}