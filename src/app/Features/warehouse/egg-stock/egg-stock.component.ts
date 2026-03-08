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
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
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
      .getEggStockByFarm(this.farmId)
      .subscribe((response: any) => {
        this.pageResult.items = response;
      });
  }
  onPageChanged(event: any) {
    this.pageNumber = event.first;
    this.pageSize = event.rows;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.pageNumber = 1;
    this.getPage();
  }
  close() {
    this.showForm = false;
    this.showConfirmDeleteDialog = false;
    this.showWarnningDialog = false;
  }
  backToList() {
    this.showForm = false;
    this.showSuccessDialog = false;
    this.getPage();
  }
  back() {
    this.showWarnningDialog = false;
  }
}
