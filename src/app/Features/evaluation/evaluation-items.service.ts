import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluationItemsService {
  baseUrl = environment.baseUrl + 'EvaluationItem';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  update(body: any) {
    return this.http.put(this.baseUrl + '/' + body.id, body);
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  getList() {
    return this.http.get(this.baseUrl);
  }
}
