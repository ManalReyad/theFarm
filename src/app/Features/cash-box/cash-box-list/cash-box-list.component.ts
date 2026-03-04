import { Component } from '@angular/core';
import { CashBoxService } from '../cash-box.service';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-box-list',
  templateUrl: './cash-box-list.component.html',
  styleUrl: './cash-box-list.component.scss',
})
export class CashBoxListComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  incomeCashMode: boolean = false;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  form!: FormGroup;
  constructor(private cashBoxService: CashBoxService, private router: Router) {}
  ngOnInit(): void {
    this.intializeListCoulmns();
    this.getPage();
    this.createForm()
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
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      amount: new FormControl(null, Validators.required),
      notes: new FormControl(''),
      date: new FormControl(null, Validators.required),
    });
  }

  getPage() {
    this.cashBoxService.getAll().subscribe((response: any) => {
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
  addNewIncomeCash() {
    this.incomeCashMode = true;
    this.form.reset();
    this.showForm = true;
  }
  addNewOutcomeCash() {
    this.incomeCashMode = false;
    this.form.reset();
    this.showForm = true;
  }
  save() {
    if (this.incomeCashMode) {
      this.cashBoxService
        .createIncomeCash(this.form.value)
        .subscribe((date) => {
          this.showSuccessDialog = true;
          this.successMesg = 'تمت الإضافة بنجاح';
        });
    } else {
      this.cashBoxService
        .createOutcomeCash(this.form.value)
        .subscribe((date) => {
          this.showSuccessDialog = true;
          this.successMesg = 'تمت الإضافة بنجاح';
        });
    }
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
