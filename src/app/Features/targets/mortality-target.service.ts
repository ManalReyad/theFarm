import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MortalityTargetService {
  baseUrl = environment.baseUrl + 'TargetMortality';

  constructor(public http: HttpClient) {}

  create(body: any) {
    return this.http.post(this.baseUrl+`/AddMultiple`, body);
  }
  getAll(maxResultCount: number, skipCount: number,breedId:number) {
    return this.http.get(
      this.baseUrl + `/GetWeeksByBreed?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}&breedId=${breedId}`
    );
  }
}
