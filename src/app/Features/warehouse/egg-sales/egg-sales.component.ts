import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EggSalesService } from '../egg-sales.service';

@Component({
  selector: 'app-egg-sales',
  templateUrl: './egg-sales.component.html',
  styleUrl: './egg-sales.component.scss'
})
export class EggSalesComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedDepartment: any;
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
    private eggSalesService: EggSalesService,
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
        header: 'المورد',
      }),
      new ListColumn({
        field: 'warehouseName',
        hide: false,
        header: 'المخزن',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'العدد',
      }),
      new ListColumn({
        field: 'unitPrice',
        hide: false,
        header: 'سعر الطبق',
      }),
      new ListColumn({
        field: 'totalPrice',
        hide: false,
        header: 'السعر الكلي',
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
        field: 'cumulativeBalance',
        hide: false,
        header: 'الرصيد التراكمي',
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
    this.eggSalesService
      .getEggSales()
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
  delete(item: any) {
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  addNew() {
    this.router.navigate(['/warehouse/egg-sales/add']);
  }
  edit(data: any) {
    this.router.navigate(['/cycle/update/' + data.item.id]);
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
