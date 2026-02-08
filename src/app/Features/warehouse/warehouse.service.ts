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
  createOutgoingStock(body: any) {
    return this.http.post(this.baseUrl + `OutgoingStock`, body);
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `GetByID?id=${id}`);
  }
}
