import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChickenSalesService {
  baseUrl = environment.baseUrl + 'ChickenSales';
  constructor(private http: HttpClient) {}

  setChickenSales(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getChickenSales() {
    return this.http.get(this.baseUrl );
  }
}
