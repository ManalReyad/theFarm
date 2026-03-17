import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { TradersService } from '../../traders/traders.service';

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
  constructor(
    private tradersService: TradersService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.traderId = this.activatedRoute.snapshot.params['id'];
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
        if(response?.invoices?.length>0)
        {
          response.invoices.forEach((invoice: any) => {
          invoice.quantity = invoice.items?.[0].quantity;
          invoice.unitPrice = invoice.items?.[0].unitPrice;
          invoice.eggQuality = invoice.items?.[0].eggQuality;
        });
        }
        this.pageResult.items = response.invoices
        this.pageResult.records = response.totalCount;
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
