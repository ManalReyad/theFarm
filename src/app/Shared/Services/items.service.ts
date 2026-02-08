import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  baseUrl = environment.baseUrl + 'Items/';

  constructor(public http: HttpClient) {}
  getItems() {
    return this.http.get(this.baseUrl);
  }
  addItems(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getById(itemId: number) {
    return this.http.get(this.baseUrl + `${itemId}`);
  }
  update(body: any) {
    return this.http.put(this.baseUrl + `${body.id}`, body);
  }
  delete(itemId: number) {
    return this.http.delete(this.baseUrl + `${itemId}`);
  }
}
