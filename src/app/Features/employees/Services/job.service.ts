import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterDataParams } from 'src/app/Shared/Models/filterDataParam';
import { BaseService } from 'src/app/Shared/Services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = environment.baseUrl + 'Job/';
  constructor(public http: HttpClient, private baseService: BaseService) {}

  getAll(filter: FilterDataParams) {
    return this.baseService.getListByFilterGenric(filter, 'Job');
  }
  getRanks()
  {
    return this.http.get(this.baseUrl +`GetRanks`)
  }
  getGrades()
  {
    return this.http.get(this.baseUrl +`GetGrades`)
  }
}
