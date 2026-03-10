import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CashBoxService {
  baseUrl = environment.baseUrl + 'CashBox';
  constructor(private http: HttpClient) {}

  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`
    );
  }
  getReport(from: any, to: any) {
    return this.http.get(this.baseUrl + `/report?from=${from}&to=${to}`);
  }
  createOutcomeCash(body: any) {
    return this.http.post(this.baseUrl + `/expense/other`, body);
  }
  createIncomeCash(body: any) {
    return this.http.post(this.baseUrl + `/income/other`, body);
  }
}
