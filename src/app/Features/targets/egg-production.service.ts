import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EggProductionService {
  baseUrl = environment.baseUrl + 'EggProductionSettings';

  constructor(public http: HttpClient) {}

  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getAll(maxResultCount: number, skipCount: number,breedId:number) {
    return this.http.get(
      this.baseUrl + `/by-breed/${breedId}?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`
    );
  }
}
