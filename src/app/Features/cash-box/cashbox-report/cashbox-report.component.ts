import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { CashBoxService } from '../cash-box.service';

@Component({
  selector: 'app-cashbox-report',
  templateUrl: './cashbox-report.component.html',
  styleUrl: './cashbox-report.component.scss',
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
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  form!: FormGroup;
  report: any;
  categoryOptions: { id: number; name: string }[] = [];
  typesOptions: { id: number; name: string }[] = [];
  pages: any = [{ name: 'الخزنة', route: '/cash-box' }, { name: 'التقرير' }];
  constructor(
    private cashBoxService: CashBoxService,
    private lookupService: LookupService,
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(null),
      category: new FormControl(),
      type: new FormControl(),
    });
    this.getDropdowns();
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
        field: 'displayName',
        objectName: 'type',
        hide: false,
        header: 'النوع',
        isObject: true,
      }),
      new ListColumn({
        field: 'displayName',
        hide: false,
        objectName: 'category',
        header: 'الفئة',
        isObject: true,
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
  getDropdowns() {
    this.lookupService.getCategories().subscribe((response: any) => {
      if (response.length > 0) {
        this.categoryOptions = response.map((item: any) => {
          return { id: item.id, name: item.displayName };
        });
      }
    });
    this.lookupService.getTypes().subscribe((response: any) => {
      if (response.length > 0) {
        this.typesOptions = response.map((item: any) => {
          return { id: item.id, name: item.displayName };
        });
      }
    });
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
      .getReport(
        startDate,
        endDate,
        this.form.value.category,
        this.form.value.type,
        this.maxResultCount,
        this.skipCount,
      )
      .subscribe((response: any) => {
        this.pageResult.items = response.transactions;
        this.pageResult.records = response.totalCount;
        this.report = response;
      });
  }
  onPageChanged(event: any) {
    this.maxResultCount = event.rows;
    this.skipCount = event.first;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.skipCount = 0;
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
