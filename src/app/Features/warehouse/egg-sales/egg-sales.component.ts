import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EggSalesService } from '../egg-sales.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserTypeEnum } from 'src/app/Shared/Enums/usert-type.enum';

@Component({
  selector: 'app-egg-sales',
  templateUrl: './egg-sales.component.html',
  styleUrl: './egg-sales.component.scss',
})
export class EggSalesComponent {
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
  form!: FormGroup;
  selectedItemId: any;
  role: any;
  userType = UserTypeEnum;
  constructor(
    private eggSalesService: EggSalesService,
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    this.getPage();
    this.form = new FormGroup({
      unitPrice: new FormControl(null, Validators.required),
    });
    this.role = this.authService.getDecodedRole();
    this.intializeListCoulmns();
  }
  intializeListCoulmns() {
    if (this.role === this.userType.Owner) {
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
          field: 'eggQuality',
          hide: false,
          header: 'نوع البيض',
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
    } else {
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
          field: 'eggQuality',
          hide: false,
          header: 'نوع البيض',
        }),
        new ListColumn({
          field: 'quantity',
          hide: false,
          header: 'العدد',
        }),
        new ListColumn({
          field: 'paidAmount',
          hide: false,
          header: 'القيمة المدفوعة',
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
  }
  getPage() {
    if (this.role === this.userType.Owner) {
      this.eggSalesService
        .getEggSales(this.maxResultCount, this.skipCount)
        .subscribe((response: any) => {
          this.pageResult.items = response.sales;
          this.pageResult.records = response.totalCount;
        });
    } else {
      this.eggSalesService
        .getEggSalesForManager(this.maxResultCount, this.skipCount)
        .subscribe((response: any) => {
          this.pageResult.items = response.sales;
          this.pageResult.records = response.totalCount;
        });
    }
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

  addNew() {
    this.router.navigate(['/warehouse/egg-sales/add']);
  }
  edit(data: any) {
    this.router.navigate(['/cycle/update/' + data.item.id]);
  }
  openPriceForm(data: any) {
    this.form.reset();
    this.showForm = true;
    this.selectedItemId = data.id;
  }
  savePrice() {
    this.eggSalesService
      .setEggPrice(this.form.value, this.selectedItemId)
      .subscribe((data) => {
        this.showSuccessDialog = true;
        this.successMesg = 'تمت ،تحديد السعر بنجاح';
      });
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
