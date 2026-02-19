import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  baseUrl = environment.baseUrl + 'Workers';
  constructor(private http: HttpClient) {}
  getAllWorkers() {
    return this.http.get(this.baseUrl);
  }
  createWorker(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  updateWorker(body: any) {
    return this.http.put(this.baseUrl + `/${body.id}`, body);
  }
  getWorkerById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }
  createVacation(body: any) {
    return this.http.post(this.baseUrl + `/vacation`, body);
  }
  getWorkerVacations(workerId: number) {
    return this.http.get(this.baseUrl + `/vacations/${workerId}`);
  }
  createAdvance(body: any) {
    return this.http.post(this.baseUrl + `/advance`, body);
  }
  getWorkerAdvances(workerId: number) {
    return this.http.get(this.baseUrl + `/advances/${workerId}`);
  }
}
