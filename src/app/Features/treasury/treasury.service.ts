import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreasuryService {
  baseUrl = environment.baseUrl + 'Treasury/';
  constructor(private http: HttpClient) {}

  getAll(
    pageIndex: number,
    pageSize: number,
    isAscending: boolean = true,
    orderBy: string = ''
  ) {
    return this.http.get(
      this.baseUrl +
        `Get?OrderBy=${orderBy}&IsAscending=${isAscending}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
  addMony(body: any) {
    return this.http.post(this.baseUrl + `AddMoney`, body);
  }
  deductMony(body: any) {
    return this.http.post(this.baseUrl + `DeductMoney`, body);
  }
  getById(id:number)
  {
    return this.http.get(this.baseUrl+`GetByID?id=${id}`)
  }
}
