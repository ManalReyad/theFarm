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
  getEggProudction(maxResultCount: number, skipCount: number) {
    return this.http.get(this.baseUrl + `warehouse?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`);
  }
  getEggProudctionByFarm(farmId:number,maxResultCount: number, skipCount: number,cycleId:number) {
    return this.http.get(this.baseUrl + `farm/${farmId}/eggs?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}&CycleId=${cycleId?cycleId:''}`);
  }
  getSummaryEggProductionByCycle(farmId:number,maxResultCount: number, skipCount: number) {
    return this.http.get(this.baseUrl + `farm/${farmId}/eggs/summary-by-cycle?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`);
  }
  getEggStockByFarm(farmId:number,maxResultCount: number, skipCount: number) {
    return this.http.get(this.baseUrl + `farm/${farmId}/warehouse-eggs?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`);
  }
}
