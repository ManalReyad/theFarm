import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  baseUrl = environment.baseUrl + 'Warehouse/';
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(this.baseUrl);
  }

  getWarehouseItem(wharehousId: number) {
    return this.http.get(this.baseUrl + `${wharehousId}/items`);
  }
  createTransaction(body: any) {
    return this.http.post(this.baseUrl + `transaction`, body);
  }
  createWarehouse(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  updateWarehouse(body: any) {
    return this.http.put(this.baseUrl+`${body.id}`, body);
  }
  getWarehouse() {
    return this.http.get(this.baseUrl);
  }
  deleteWarehouse(id:number) {
    return this.http.delete(this.baseUrl+id);
  }
}
