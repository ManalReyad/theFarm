import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EggProductionService {
  baseUrl = environment.baseUrl + 'EggProduction/';
  constructor(private http: HttpClient) {}

  setEggProudction(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getEggProudction() {
    return this.http.get(this.baseUrl + `warehouse`);
  }
  getEggProudctionByFarm(farmId:number) {
    return this.http.get(this.baseUrl + `farm/${farmId}/eggs`);
  }
}
