import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  baseUrl = environment.baseUrl + 'Lookups/';

  constructor(public http: HttpClient) {}

  getBarnsByFarmId(farmId: number) {
    return this.http.get(this.baseUrl + `barns/${farmId}`);
  }
  getStoreItems() {
    return this.http.get(this.baseUrl + `store-items`);
  }
  getFeedMixes() {
    return this.http.get(this.baseUrl + `feed-mixes`);
  }
  getMedicines() {
    return this.http.get(this.baseUrl + `medicines`);
  }
  getSuppliers() {
    return this.http.get(this.baseUrl + `suppliers`);
  }
  getBuyers() {
    return this.http.get(this.baseUrl + `buyers`);
  }
  getActiveCycles(farmId: number) {
    return this.http.get(this.baseUrl + `active-cycles/${farmId}`);
  }
  getUpcomingCycles(farmId: number) {
    return this.http.get(this.baseUrl + `upcoming-cycles`);
  }
  getFeedTypes() {
    return this.http.get(`${environment.baseUrl}FeedTypes`);
  }
  getWarehouseByFarmId(farmId: number) {
    return this.http.get(this.baseUrl + `warehouse/by-farm/${farmId}`);
  }
  getFarms() {
    return this.http.get(this.baseUrl + `farms`);
  }
  getEvaluationItems() {
    return this.http.get(this.baseUrl + `evaluation-items`);
  }
  getAssetItems() {
    return this.http.get(this.baseUrl + `asset-items`);
  }
  getBreeds() {
    return this.http.get(this.baseUrl + `Breeds`);
  }
}
