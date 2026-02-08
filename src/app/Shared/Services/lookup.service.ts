import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  baseUrl = environment.baseUrl + 'Lookups/';

  constructor(public http: HttpClient) {}

  GetAllDepartments() {
    return this.http.get(this.baseUrl + `GetAllDepartments`);
  }
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
  getActiveCycles(farmId: number) {
    return this.http.get(this.baseUrl + `active-cycles/${farmId}`);
  }
  getFeedTypes() {
    return this.http.get(`${environment.baseUrl}FeedTypes`);
  }
}
