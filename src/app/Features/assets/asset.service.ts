import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  baseUrl = environment.baseUrl + 'AssetItems';
  constructor(private http: HttpClient) {}
  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`
    );
  }
  getList() {
    return this.http.get(this.baseUrl);
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  update(body: any) {
    return this.http.put(`${this.baseUrl}/${body.id}`, body);
  }
  delete(id:number,forceDelete:boolean)
  {
    return this.http.delete(this.baseUrl+`/${id}?forceDelete=${forceDelete}`)
  }
}
