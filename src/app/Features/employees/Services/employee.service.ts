import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterDataParams } from 'src/app/Shared/Models/filterDataParam';
import { BaseService } from 'src/app/Shared/Services/base.service';
import { environment } from 'src/environments/environment';
import { EmploymentData } from '../Models/employment-data';
import { EmployementRecord } from '../Models/employement-record';
import { Qualifications } from '../Models/qualification';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.baseUrl + 'Employee/';

  employmentData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  employmentRecords: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  qualifications: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient, private baseService: BaseService) {}

  getAll(filter: FilterDataParams) {
    return this.baseService.getListByFilterGenric(filter, 'Employee');
  }

  create(body: any) {
    return this.http.post(this.baseUrl + `Create`, body);
  }
  update(body: any) {
    return this.http.post(this.baseUrl + `Update`, body);
  }
  getById(id: number) {
    return this.http.get(this.baseUrl + `GetById?id=${id}`);
  }
  delete(id: number) {
    return this.http.post(this.baseUrl + `Delete?id=${id}`, {});
  }
  filter(body:any) {
    return this.http.post(this.baseUrl + `Get`,body);
  }
  getReleasePlaces() {
    return this.http.get(this.baseUrl + `GetReleasePlaces`);
  }
  setEmploymentData(data: EmploymentData | {}) {
    this.employmentData.next(data);
  }
  setEmploymentRecords(data: EmployementRecord[]) {
    this.employmentRecords.next(data);
  }
  setQualifications(data: Qualifications[]) {
    this.qualifications.next(data);
  }
}
