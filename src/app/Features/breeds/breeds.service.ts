import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {
  baseUrl = environment.baseUrl + 'Breeds';
  constructor(private http: HttpClient) {}

  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`
    );
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  delete(id:number)
  {
   return this.http.delete(this.baseUrl+`/${id}`)
  }
}
