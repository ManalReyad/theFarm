import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
 baseUrl = environment.baseUrl + 'Barns';
  constructor(private http: HttpClient) {}

  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`
    );
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  update(body: any) {
    return this.http.put(this.baseUrl+'/'+body.id, body);
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `/GetByID/${id}`);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  getList(farmId:any='') {
    return this.http.get(this.baseUrl);
  }
}
