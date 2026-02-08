import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  baseUrl = environment.baseUrl + 'AssetItems';
  constructor(private http: HttpClient) {}
  getAll(
    pageIndex: number,
    pageSize: number,
    isAscending: boolean = true,
    orderBy: string = '',
  ) {
    return this.http.get(this.baseUrl);
  }
  getList()
  {
        return this.http.get(this.baseUrl);

  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
 
}
