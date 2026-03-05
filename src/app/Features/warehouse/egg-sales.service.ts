import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EggSalesService {
  baseUrl = environment.baseUrl + 'EggSales/';
  constructor(private http: HttpClient) {}

  setEggSales(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getEggSales() {
    return this.http.get(this.baseUrl );
  }

  setEggPrice(body: any,id:any) {
    return this.http.put(this.baseUrl+`${id}/set-price`, body);
  }
}
