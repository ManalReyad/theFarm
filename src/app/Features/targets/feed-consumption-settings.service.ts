import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedConsumptionSettingsService {
  baseUrl = environment.baseUrl + 'FeedConsumptionSettings';
  constructor(private http: HttpClient) {}

  getFeedReport(maxResultCount: number, skipCount: number, cycleId = '') {
    return this.http.get(
      this.baseUrl +
        `/feed-report?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}&cycleId=${cycleId}`
    );
  }
  create(body: any) {
    return this.http.post(this.baseUrl, body);
  }
  getFeedConsumptionSettingsByBreed(maxResultCount: number, skipCount: number, breedId: number) {
    return this.http.get(this.baseUrl + `/by-breed/${breedId}`);
  }
}
