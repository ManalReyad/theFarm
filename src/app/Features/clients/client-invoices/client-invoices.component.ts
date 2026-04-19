import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { TradersService } from '../../traders/traders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-invoices',
  templateUrl: './client-invoices.component.html',
  styleUrl: './client-invoices.component.scss',
})
export class ClientInvoicesComponent {
  pages: any = [
    { name: 'العملاء', route: '/traders' },
    { name: 'حساب العميل' },
  ];
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedTrader: any;

  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  successMesg: string = '';
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  traderId: any;
  data: any;
  form!: FormGroup;
  warehouseOptions: { id: number; name: string }[] = [];
  farmId: any;

  constructor(
    private tradersService: TradersService,
    private activatedRoute: ActivatedRoute,
    private lookupService: LookupService,
  ) {}

  ngOnInit(): void {
    this.traderId = this.activatedRoute.snapshot.params['id'];
    this.farmId = Number(localStorage.getItem('farmId'));

    this.intializeListCoulmns();
    this.getPage();
    this.createForm();
    this.getDropdowns()
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
        field: 'totalAmount',
        hide: false,
        header: 'إجمالي الفاتورة',
        isCurrancy: true,
      }),
      new ListColumn({
        field: 'paidAmount',
        hide: false,
        header: 'المبلغ المدفوع',
        isCurrancy: true,
      }),
      new ListColumn({
        field: 'remainingAmount',
        hide: false,
        header: 'المبلغ المتبقي',
        isCurrancy: true,
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'عدد الأطباق',
      }),
      new ListColumn({
        field: 'unitPrice',
        hide: false,
        header: 'سعر الطبق',
      }),
      new ListColumn({
        field: 'eggQuality',
        hide: false,
        header: 'النوع',
      }),
    ];
  }
  getPage() {
    this.tradersService
      .getClientInvioces(this.traderId, this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
        this.data = response;
        if (response?.invoices?.length > 0) {
          response.invoices.forEach((invoice: any) => {
            invoice.quantity = invoice.items?.[0].quantity;
            invoice.unitPrice = invoice.items?.[0].unitPrice;
            invoice.eggQuality = invoice.items?.[0].eggQuality;
          });
        }
        this.pageResult.items = response.invoices;
        this.pageResult.records = response.totalCount;
      });
  }
  save() {
    this.form.get('traderId')?.setValue(this.traderId);
    this.tradersService.addClientInvioces(this.form.value).subscribe((data) => {
      this.showForm = false;
      this.showSuccessDialog = true;
      this.successMesg = 'تم إضافة الحساب بنجاح';
    });
  }
  getDropdowns() {
    this.lookupService
      .getWarehouseByFarmId(this.farmId)
      .subscribe((res: any) => {
        this.warehouseOptions = res ? [{ ...res }] : [];
      });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      traderId: new FormControl(null),
      warehouseId: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required),
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.showForm = true;
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
  close() {
    this.showForm = false;
    this.showConfirmDeleteDialog = false;
  }

  backToList() {
    this.showForm = false;
    this.showSuccessDialog = false;
    this.getPage();
  }
}
