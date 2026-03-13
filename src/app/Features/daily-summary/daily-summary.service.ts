import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DailySummaryService {
  baseUrl = environment.baseUrl + 'DailySummary';
  constructor(private http: HttpClient) {}

  getAll(
    startDate: any,
    endDate: any,
    cycleId: any,
    maxResultCount: number,
    skipCount: number
  ) {
    return this.http.get(
      this.baseUrl +
        `?startDate=${startDate}&endDate=${endDate}&cycleId=${cycleId?cycleId:''}&skipCount=${skipCount}&maxResultCount=${maxResultCount}`
    );
  }
}
