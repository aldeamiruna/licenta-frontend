import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import Document from '../../models/Document';
import ItemProtocol from 'src/app/models/ItemProtocol';
import Item from 'src/app/models/Item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  static readonly API_URL = 'http://localhost:8080';
  httpOptions = {
    'responseType': 'arraybuffer' as 'json'
  };

  constructor(private httpClient: HttpClient) { }

  fetchTemplate(type: string): Promise<any>{
    return this.httpClient.get<any>(`${DocumentService.API_URL}/document/generate?type=${type}`, this.httpOptions)
      .toPromise();
  }

  fetchAllTemplates(): Promise<Document[]> {
    return this.httpClient.get<Document[]>(`${DocumentService.API_URL}/document/`)
      .toPromise();
  }

  fetchCurrentTemplate(): Promise<ItemProtocol[]> {
    return this.httpClient.get<ItemProtocol[]>(`${DocumentService.API_URL}/document/currentTemplate`)
      .toPromise();
  }

  fetchDocumentByTemplate(input: ItemProtocol): Promise<any> {

    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    console.log(input);
    return this.httpClient.post<ItemProtocol>(`${DocumentService.API_URL}/document/generateByTemplate`,
      input, { headers: header, responseType:"arraybuffer" as "json" }).toPromise();

  }

  downloadCurrent() {
    // let headers = new Headers();
    // //headers.append('Authorization', 'JWT ' + localStorage.getItem('id_token'));
    // return this.httpClient.get<any>(`${DocumentService.API_URL}/document/download/current`, {
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // });
    window.open(`${DocumentService.API_URL}/document/download/current`);
    window.setTimeout(function() {
      this.close();
    }, 1000);
  }

  saveTemplate(input: Document): Promise<any> {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    console.log(input);
    return this.httpClient.post<Document>(`${DocumentService.API_URL}/document/add`,
      input, { headers: header }).toPromise();

  }

  setCurrentItem(input: Item): Promise<any> {
    let header = new HttpHeaders({ "content-type": "application/json", "Accept": "application/json" });
    return this.httpClient.post<any>(`${DocumentService.API_URL}/document/changeItem`,
    input, { headers: header }).toPromise();
  }

  getItemByInventoryNumber(input: string): Promise<Item[]> {
    return this.httpClient.get<Item[]>(`${DocumentService.API_URL}/items/findByInventoryNumber?number=${input}`)
      .toPromise();
  }

  detachItem(): Promise<any> {
    return this.httpClient.get<any>(`${DocumentService.API_URL}/document/detachItem`)
      .toPromise();
  }

}
