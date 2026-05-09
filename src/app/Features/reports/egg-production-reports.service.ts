import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EggProductionReportsService {
  baseUrl = environment.baseUrl + 'EggProductionReport';
  constructor(private http: HttpClient) {}

  getEggProductionReport(maxResultCount: number, skipCount: number, cycleId = '') {
    return this.http.get(
      this.baseUrl +
        `/egg-report?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}&cycleId=${cycleId}`
    );
  }
      exportExcel(cycleId:number) {
    return this.http.get(this.baseUrl+`/export-excel/${cycleId}`, {
      responseType: 'blob'
    });
  }
}
