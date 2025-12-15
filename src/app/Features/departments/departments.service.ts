import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterDataParams } from 'src/app/Shared/Models/filterDataParam';
import { BaseService } from 'src/app/Shared/Services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  baseUrl = environment.baseUrl + 'Department/';

  constructor(public http: HttpClient, private baseService: BaseService) {}

  getAll(filter: FilterDataParams) {
    return this.baseService.getListByFilterGenric(filter, 'Department');
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
}
