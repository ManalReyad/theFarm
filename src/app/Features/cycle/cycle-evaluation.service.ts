import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CycleEvaluationService {
  baseUrl = environment.baseUrl + 'CycleEvaluation';
  constructor(private http: HttpClient) {}

  getAllByCycle(cycleId:number) {
    return this.http.get(this.baseUrl+`/${cycleId}`);
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
}
