import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { CashBoxService } from '../cash-box.service';

@Component({
  selector: 'app-cashbox-report',
  templateUrl: './cashbox-report.component.html',
  styleUrl: './cashbox-report.component.scss'
})
export class CashboxReportComponent implements OnInit {
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
  form!:FormGroup
  report:any
  constructor(private cashBoxService: CashBoxService, private router: Router) {}
  ngOnInit(): void {
    this.form=new FormGroup({
      date:new FormControl(null),
    })
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
        field: 'date',
        hide: false,
        header: 'التاريخ',
        isDate: true,
      }),
      new ListColumn({
        field: 'type',
        hide: false,
        header: 'النوع',
      }),
      new ListColumn({
        field: 'category',
        hide: false,
        header: 'الفئة',
      }),
      new ListColumn({
        field: 'amount',
        hide: false,
        header: 'المبلغ',
      }),
      new ListColumn({
        field: 'notes',
        hide: false,
        header: 'ملاحظات',
      }),
      // new ListColumn({
      //   field: 'traderId',
      //   hide: false,
      //   header: 'رقم التاجر',
      // }),
      // new ListColumn({
      //   field: 'workerId',
      //   hide: false,
      //   header: 'رقم العامل',
      // }),
      // new ListColumn({
      //   field: 'warehouseId',
      //   hide: false,
      //   header: 'رقم المخزن',
      // }),
    ];
  }
  getPage() {
    const [start, end] = this.form.value.date ?? [];

    const toISOStringWithoutOffset = (date: Date): string => {
      return new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      ).toISOString();
    };

    const setEndOfDay = (date: Date): Date => {
      date.setHours(23, 59, 59, 999);
      return date;
    };

    const startDate = start ? toISOStringWithoutOffset(new Date(start)) : '';

    const endDate = end
      ? toISOStringWithoutOffset(setEndOfDay(new Date(end)))
      : start
      ? toISOStringWithoutOffset(setEndOfDay(new Date(start)))
      : '';
    this.cashBoxService
      .getReport(startDate,endDate)
      .subscribe((response: any) => {
        this.pageResult.items = response.transactions;
        this.report=response
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
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
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
