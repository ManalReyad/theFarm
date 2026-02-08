import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  baseUrl = environment.baseUrl + 'AssetWarehouse';
  constructor(private http: HttpClient) {}
  getTransactionsByFarm(farmId: number) {
    return this.http.get(this.baseUrl + `/transactions/${farmId}`);
  }
  withdraw(body: any) {
    return this.http.post(this.baseUrl + `/withdraw`, body);
  }
  deposit(body: any) {
    return this.http.post(this.baseUrl + `/deposit`, body);
  }
}
