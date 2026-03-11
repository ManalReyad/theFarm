import { Component } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { WharehouseAssetsService } from '../wharehouse-assets/wharehouse-assets.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  isDeposit: boolean = false;
  form!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  farmId!: number;
  warehouseAssetItemsOptions: { id: number; name: string }[] = [];
  barnsOptions: { id: number; name: string }[] = [];
  constructor(
    private transactionsService: TransactionsService,
    private wharehouseAssetService: WharehouseAssetsService,
    private lookupService: LookupService
  ) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    this.getPage();
    this.createForm();
    this.intializeListCoulmns();
    this.getDrodowns();
  }
  getDrodowns() {
    this.lookupService.getAssetItems().subscribe((data: any) => {
      this.warehouseAssetItemsOptions = data;
    });
    this.lookupService.getBarnsByFarmId(this.farmId).subscribe((data: any) => {
      this.barnsOptions = data || [];
    });
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
        field: 'barnName',
        hide: false,
        header: 'العنبر',
      }),
      new ListColumn({
        field: 'assetItemName',
        hide: false,
        header: 'الأصل',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'العدد',
      }),
      new ListColumn({
        field: 'unitPrice',
        hide: false,
        header: 'سعر الوحدة',
      }),
      new ListColumn({
        field: 'totalValue',
        hide: false,
        header: 'السعر الكلي',
      }),
      new ListColumn({
        field: 'transactionType',
        hide: false,
        header: 'نوع العملية',
      }),
      new ListColumn({
        field: 'date',
        hide: false,
        isDate: true,
        header: 'التاريخ',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      assetWarehouseItemId: new FormControl(null, Validators.required),
      barnId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
    });
  }
  withdraw() {
    this.isDeposit = false;
    this.form.reset();
    this.showForm = true;
  }
  deposit() {
    this.isDeposit = true;
    this.form.reset();
    this.showForm = true;
  }
  submitTransaction() {
    if (this.isDeposit) {
      this.transactionsService.deposit(this.form.value).subscribe((data) => {
        this.successMesg = 'تم إضافة الأصل من العنبر للمخزن بنجاح';
        this.showForm = false;
        this.showSuccessDialog = true;
      });
    } else {
      this.transactionsService.withdraw(this.form.value).subscribe((data) => {
        this.successMesg = 'تم صرف الأصل من المخزن إلى العنبر بنجاح';
        this.showForm = false;
        this.showSuccessDialog = true;
      });
    }
  }

  getPage() {
    this.transactionsService
      .getTransactionsByFarm(this.farmId, this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
        response.transactions.forEach((element: any) => {
          element.transactionType =
            element.transactionType == 'Withdraw'
              ? 'صرف من المخزن للعنبر'
              : 'إضافة من العنبر إلى المخزن';
        });
        this.pageResult.items = response.transactions;
        this.pageResult.records=response.totalCount
      });
  }

  showWarnningMessage() {
    this.showWarnningDialog = true;
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
