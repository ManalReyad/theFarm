import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WharehouseAssetsService {
  baseUrl = environment.baseUrl + 'AssetWarehouse';
  constructor(private http: HttpClient) {}
  createWarehouseAsset(body: any) {
    return this.http.post(this.baseUrl + '/create', body);
  }
  getAssetWarehouseByFarm(farmId: number,maxResultCount:number,skipCount:number) {
    return this.http.get(this.baseUrl + `/${farmId}?skip=${skipCount}&take=${maxResultCount}`);
  }
  createAsset(body: any) {
    return this.http.post(this.baseUrl + '/add', body,{ responseType: 'text' });
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `/GetByID?id=${id}`);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + `?id=${id}`);
  }
}
