import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TradersService {
  baseUrl = environment.baseUrl + 'Traders';
  constructor(private http: HttpClient) {}

  getAll(maxResultCount: number, skipCount: number, type: number) {
    return this.http.get(
      this.baseUrl +
        `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}&type=${type}`,
    );
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
  getLedger(traderId: number, maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl +
        `/trader/${traderId}/ledger?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`,
    );
  }
  addClientInvioces(body: any) {
    return this.http.post(this.baseUrl + `/pay-trader`, body);
  }
  getClientInvioces(
    traderId: number,
    maxResultCount: number,
    skipCount: number,
  ) {
    return this.http.get(
      this.baseUrl +
        `/customer/${traderId}/invoices?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`,
    );
  }
}
