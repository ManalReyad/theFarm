import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedMixService {
  baseUrl = environment.baseUrl + 'FeedMix';

  constructor(public http: HttpClient) {}

  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getAll(maxResultCount: number, skipCount: number) {
    return this.http.get(
      this.baseUrl + `?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`,
    );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`, { responseType: 'text' });
  }
}
