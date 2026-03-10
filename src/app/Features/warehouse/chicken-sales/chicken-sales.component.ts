import { Component } from '@angular/core';
import { ChickenSalesService } from '../chicken-sales.service';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { SharedModule } from "src/app/Shared/shared.module";

@Component({
  selector: 'app-chicken-sales',
  templateUrl: './chicken-sales.component.html',
  styleUrl: './chicken-sales.component.scss',
})
export class ChickenSalesComponent {
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
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  farmId: any;
  constructor(
    private chickenSalesService: ChickenSalesService,
    private router: Router,
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
        field: 'traderName',
        hide: false,
        header: 'المشتري',
      }),
      new ListColumn({
        field: 'cycleName',
        hide: false,
        header: 'الدورة',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'العدد',
      }),
      new ListColumn({
        field: 'unitPrice',
        hide: false,
        header: 'السعر ',
      }),
      new ListColumn({
        field: 'totalPrice',
        hide: false,
        header: 'إجمالي السعر',
      }),
      new ListColumn({
        field: 'paidAmount',
        hide: false,
        header: 'القيمة المدفوعة',
      }),
      new ListColumn({
        field: 'remainingAmount',
        hide: false,
        header: 'القيمة المتبقية',
      }),
      new ListColumn({
        field: 'traderBalance',
        hide: false,
        header: 'رصيد المشتري',
      }),
      new ListColumn({
        field: 'date',
        hide: false,
        header: 'التاريخ',
        isDate: true,
      }),
    ];
  }
  getPage() {
    this.chickenSalesService
      .getChickenSales(this.maxResultCount,this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.sales;
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
  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  addNew() {
    this.router.navigate(['/warehouse/chicken-sales/add']);
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
