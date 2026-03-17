import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { TradersService } from '../traders.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrl: './ledger.component.scss'
})
export class LedgerComponent {
  pages: any = [
    { name: 'الموردين', route: '/traders' },
    { name: 'حساب المورد' },
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
    traderId:any
    constructor(
      private tradersService: TradersService,
      private activatedRoute: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.traderId=this.activatedRoute.snapshot.params['id']
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
          isDate:true
        }),
        new ListColumn({
          field: 'debit',
          hide: false,
          header: 'قيمة الفاتورة',
        }),
        new ListColumn({
          field: 'credit',
          hide: false,
          header: 'المدفوع',
        }),
         new ListColumn({
          field: 'balance',
          hide: false,
          header: 'الحساب التراكمي',
        }),
         new ListColumn({
          field: 'notes',
          hide: false,
          header: 'نوع الفاتورة',
        }),
      ];
    }
  
    getPage() {
      this.tradersService
        .getLedger(this.traderId,this.maxResultCount, this.skipCount)
        .subscribe((response: any) => {
          this.pageResult.items = response.ledger;
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
