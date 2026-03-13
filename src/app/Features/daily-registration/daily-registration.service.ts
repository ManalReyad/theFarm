import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DailyRegistrationService {
  baseUrl = environment.baseUrl + 'DailyRecords';
  constructor(private http: HttpClient) {}

  getAll(maxResultCount: number, skipCount: number,cycleId='') {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}&cycleId=${cycleId?cycleId:''}`
    );
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
  getList() {
    return this.http.get(this.baseUrl);
  }
}
