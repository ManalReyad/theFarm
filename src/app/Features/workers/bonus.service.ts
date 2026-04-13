import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  baseUrl = environment.baseUrl + 'Bonus';
  constructor(private http: HttpClient) {}
  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `/all?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`
    );
  }
}
