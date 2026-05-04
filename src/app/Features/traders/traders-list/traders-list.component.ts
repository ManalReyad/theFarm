import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { TradersService } from '../traders.service';

@Component({
  selector: 'app-traders-list',
  templateUrl: './traders-list.component.html',
  styleUrl: './traders-list.component.scss'
})
export class TradersListComponent {
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
  customActionMenu: {
    label: string;
    icon?: string;
    img?: string;
    visible:boolean;
    command: (entity: any) => void;
  }[] = [
    {
      label: 'تعديل',
      img: 'assets/images/edit.svg',
      command: (item: any) => this.edit(item),
      visible:true
    },
    {
      label: 'حذف',
      img: 'assets/images/delete.svg',
      command: (item: any) => this.delete(item),
      visible:true
    },
    {
      label: 'حساب المورد',
      icon: 'pi pi-list text-[#7c3aed]',
      command: (item: any) => this.goToInvioces(item),
      visible:true
    },
  ];
  constructor(
    private tradersService: TradersService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        field: 'name',
        hide: false,
        header: 'اسم المورد',
      }),
      new ListColumn({
        field: 'mobile',
        hide: false,
        header: 'رقم الموبايل',
      }),
      new ListColumn({
        field: 'balance',
        hide: false,
        header: 'الرصيد',
      }),
    ];
  }

  getPage() {
    this.tradersService
      .getAll(this.maxResultCount, this.skipCount,1)
      .subscribe((response: any) => {
        this.pageResult.items = response.traders;
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
    this.selectedTrader = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.tradersService
      .delete(this.selectedTrader.id)
      .subscribe(() => {
        this.successMesg = 'تم حذف المورد بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showConfirmDeleteDialog = false;
      });
  }

  addNew() {
    this.router.navigate(['/traders/create']);
  }

  edit(item: any) {
    this.router.navigate(['/traders/update/' + item.id]);
  }
  goToInvioces(item: any) {
    this.router.navigate(['/traders/invioces/' + item.id],{queryParams:{name:item.name}});
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
