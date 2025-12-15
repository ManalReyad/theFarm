import { HttpClient, HttpParams,HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterDataParams } from '../Models/filterDataParam';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl: string;
  isFaild = new BehaviorSubject<boolean>(false);
  faliureMessage = new BehaviorSubject<string>('');
  private networkStatus = new BehaviorSubject<boolean>(navigator.onLine);
  public networkStatus$ = this.networkStatus.asObservable();
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  ////////////////////////////////////////////////////
  getListByFilterGenric(
    filterDataParams: FilterDataParams,
    controllerRoute: string,
    routeName: string = 'GetResultsByFilter'
  ): Observable<any> {
    let params = new HttpParams();
    if (
      filterDataParams?.VisitRequestStatusIds != undefined &&
      filterDataParams?.VisitRequestStatusIds != null
    ) {
      for (
        let index = 0;
        index < filterDataParams?.VisitRequestStatusIds.length;
        index++
      ) {
        params = params.append(
          `VisitRequestStatusIds`,
          filterDataParams?.VisitRequestStatusIds[index]
        );
      }
    }
    if (
      filterDataParams?.VisitRequestTypeIds != undefined &&
      filterDataParams?.VisitRequestTypeIds != null
    ) {
      for (
        let index = 0;
        index < filterDataParams?.VisitRequestTypeIds.length;
        index++
      ) {
        params = params.append(
          `VisitRequestTypeIds`,
          filterDataParams?.VisitRequestTypeIds[index]
        );
      }
    }
    params = params.set(
      'SkipCount',
      filterDataParams?.skipCount ? filterDataParams?.skipCount : 0
    );
    if (
      filterDataParams?.filterItems != undefined &&
      filterDataParams?.filterItems != null
    ) {
      let jsonString = this.generateJson(filterDataParams?.filterItems);
      params = params.set('Filter', jsonString);
    }

    if (filterDataParams?.lang != undefined && filterDataParams?.lang != null) {
      params = params.set('Lang', filterDataParams?.lang);
    }
    if (
      filterDataParams?.maxResultCount != undefined &&
      filterDataParams?.maxResultCount != null
    ) {
      params = params.set('MaxResultCount', filterDataParams?.maxResultCount);
    }
    if (
      filterDataParams?.fullResult != undefined &&
      filterDataParams?.fullResult != null
    ) {
      params = params.set('fullResult', filterDataParams?.fullResult);
    }
    if (
      filterDataParams?.searchTerm != undefined &&
      filterDataParams?.searchTerm != null
    ) {
      params = params.set('SearchTerm', filterDataParams?.searchTerm);
    }
    if (
      filterDataParams?.sortBy != undefined &&
      filterDataParams?.sortBy != null
    ) {
      params = params.set('SortBy', filterDataParams?.sortBy);
    }
    if (
      filterDataParams?.sortingDirection != undefined &&
      filterDataParams?.sortingDirection != null
    ) {
      params = params.set(
        'SortingDirection',
        filterDataParams?.sortingDirection
      );
    }
    if (
      filterDataParams?.ExtraPrams != undefined &&
      filterDataParams?.ExtraPrams != null
    ) {
      filterDataParams?.ExtraPrams.forEach((element) => {
        params = params.set(element.key, element.value);
      });
    }
    if (
      filterDataParams?.FilterType != undefined &&
      filterDataParams?.FilterType != null
    ) {
      params = params.set('FilterType', filterDataParams?.FilterType);
    }
    return this.http.get<any>(
      this.baseUrl  + controllerRoute + '/' + routeName,
      { params: params }
    );
  }

  generateJson(items: JsonItem[]): string {
    const result: { [key: string]: { Operator: string; Value: string } } = {};

    for (const item of items) {
      result[item.key] = { Operator: item.operator, Value: item.value };
    }

    return JSON.stringify(result, null); // Indent with 2 spaces for better readability
  }

  createJsonItem(
    selectName: string,
    selectedValue: string,
    operator: string
  ): any {
    // Create and return a JSON item based on the selectName, selectedValue, and operator
    return {
      key: selectName,
      operator: operator,
      value: selectedValue,
    };
  }

  createParamItem(selectName: string, selectedValue: string): any {
    // Create and return a JSON item based on the selectName, selectedValue, and operator
    return {
      key: selectName,
      value: selectedValue,
    };
  }
  deleteFileByPath(body: any) {
    return this.http.post(this.baseUrl + `/Files/DeleteByPath`, body);
  }

  getPickedFiles(route: string) {
    return this.http.get(this.baseUrl + `/Files/GetPickedFiles?route=${route}`);
  }
  
  setFailureMessage(message:string)
  {
    this.faliureMessage.next(message)
  }
  showFaildMessageDailoge() {
    this.isFaild.next(true);
  }
  hideFaildMessageDailoge() {
    this.isFaild.next(false);
  }

  
}

export interface JsonItem {
  key: string;
  value: string;
  operator: string;
}


