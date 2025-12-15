import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  baseUrl = environment.baseUrl +'LookUp/';

  constructor(public http: HttpClient) {}

  GetAllDepartments()
  {
    return this.http.get(this.baseUrl + `GetAllDepartments`)
  }
}
