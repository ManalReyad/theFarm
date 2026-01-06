import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {
  baseUrl = environment.baseUrl + 'Treasury/';
  constructor(private http: HttpClient) {}
  addMony(body: any) {
    return this.http.post(this.baseUrl + `AddMony`, body);
  }
  deductMony(body: any) {
    return this.http.post(this.baseUrl + `DeductMony`, body);
  }
  getAll(
    pageIndex: number,
    pageSize: number,
    isAscending: boolean = true,
    orderBy: string = ''
  ) {}
}
