import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  baseUrl = environment.baseUrl + 'Warehouse/';
  constructor(private http: HttpClient) {}
  createIncomingStock(body: any) {
    return this.http.post(this.baseUrl+`IncomingStock`, body);
  }
  createOutgoingStock(body: any) {
    return this.http.post(this.baseUrl+`OutgoingStock`, body);
  }
}
