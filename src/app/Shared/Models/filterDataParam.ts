import { JsonItem } from "../Services/base.service";

export class FilterDataParams {
    searchTerm?: string;
    lang?: string;
    sortingDirection?: string;
    sortBy?: string;
    maxResultCount: number;
    filterItems?: JsonItem[];
    ExtraPrams?: ParamItem[];
    fullResult: boolean;
    skipCount:number;
    pageNumber:number;
    FilterType:number;
    VisitRequestStatusIds?:any[]
    VisitRequestTypeIds:any[]
    constructor(
      searchTerm?: string,
      filter?: string,
      lang?: string,
      sortingDirection?: string,
      sortBy?: string,
      maxResultCount: number = 10,
      filterItems?: JsonItem[],
      ExtraPrams?: ParamItem[],
      fullResult: boolean = false,
      skipCount?:number,
      pageNumber?:number,
      FilterType? :number,
      VisitRequestStatusIds?:any[],
      VisitRequestTypeIds?:any[]
    ) {
      this.searchTerm = searchTerm;
      this.lang = lang;
      this.sortingDirection = sortingDirection;
      this.sortBy = sortBy;
      this.maxResultCount = maxResultCount;
      this.filterItems = filterItems;
      this.ExtraPrams = ExtraPrams;
      this.fullResult = fullResult;
      this.skipCount = skipCount ?? 0;          
      this.pageNumber = pageNumber ?? 1;       
      this.FilterType = FilterType ?? 0; 
      this.VisitRequestStatusIds = this.VisitRequestStatusIds;
      this.VisitRequestTypeIds = VisitRequestTypeIds??[];
    }
   
  }
  
  export interface ParamItem {
    key: string;
    value: string;
    operator?: string;
  }
  