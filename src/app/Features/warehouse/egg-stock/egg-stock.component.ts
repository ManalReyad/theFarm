import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EggProductionService } from '../egg-production.service';

@Component({
  selector: 'app-egg-stock',
  templateUrl: './egg-stock.component.html',
  styleUrl: './egg-stock.component.scss',
})
export class EggStockComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  farmId: any;
  constructor(
    private eggProductionService: EggProductionService,
  ) {}
  ngOnInit(): void {
    this.farmId =Number( localStorage.getItem('farmId'))
    this.intializeListCoulmns();
    this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: '',
        hide: false,
        header: '#',
        width: 5,
        isIndex: true,
      }),
  
      new ListColumn({
        field: 'warehouseName',
        hide: false,
        header: 'المخزن',
      }),
  
      new ListColumn({
        field: 'itemName',
        hide: false,
        header: 'النوع',
      }),
  
      new ListColumn({
        field: 'eggQuality',
        hide: false,
        header: 'جودة البيض',
      }),
  
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'الكمية',
      }),
  
      new ListColumn({
        field: 'withdrawn',
        hide: false,
        header: 'المسحوب',
      }),
  
      new ListColumn({
        field: 'pricePerUnit',
        hide: false,
        header: 'سعر الطبق',
      }),
  
      new ListColumn({
        field: 'totalValue',
        hide: false,
        header: 'إجمالي القيمة',
      }),
    ];
  }
  getPage() {
    this.eggProductionService
      .getEggStockByFarm(this.farmId,this.maxResultCount,this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.warehouseEggs;
        this.pageResult.records=response.totalCount
      });
  }
  onPageChanged(event: any) {
    this.maxResultCount= event.rows;
    this.skipCount= event.first;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.skipCount= 0;
    this.getPage();
  }

}
