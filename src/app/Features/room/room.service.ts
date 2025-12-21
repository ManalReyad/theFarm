import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
 baseUrl = environment.baseUrl + 'Room';
  constructor(private http: HttpClient) {}

  getAll(
    pageIndex: number,
    pageSize: number,
    isAscending: boolean = true,
    orderBy: string = ''
  ) {
    return this.http.get(
      this.baseUrl +
        `/Get?OrderBy=${orderBy}&IsAscending=${isAscending}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  update(body: any) {
    return this.http.put(this.baseUrl, body);
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `/GetByID?id=${id}`);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + `?id=${id}`);
  }
  getList() {
    return this.http.get(this.baseUrl + `/GetList`);
  }
}
