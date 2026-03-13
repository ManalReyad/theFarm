import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { DailySummaryService } from '../daily-summary.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrl: './daily-summary.component.scss',
})
export class DailySummaryComponent {
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
  farmId: any;
  cycleOptions: { id: number; name: string }[] = [];

  constructor(
    private dailySummaryService: DailySummaryService,
    private lookupService: LookupService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl([new Date(Date.now())]),
      cycleId: new FormControl(null),
    });
    this.farmId = Number(localStorage.getItem('farmId'));

    this.intializeListCoulmns();
    this.getPage();
    this.getDropdown();
  }
   getDropdown() {
    this.lookupService
      .getActiveCycles(this.farmId)
      .subscribe((response: any) => {
        this.cycleOptions =response?.length>0? response.map((item:any)=>{return{id:item.id,name:item.cycleName}}):[];
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
        field: 'date',
        hide: false,
        header: 'التاريخ',
        isDate: true,
      }),
      new ListColumn({
        field: 'dayName',
        hide: false,
        header: 'اليوم',
      }),
      new ListColumn({
        field: 'cycleName',
        hide: false,
        header: 'الدورة',
      }),
      new ListColumn({
        field: 'chickAge',
        hide: false,
        header: 'عمر الفراخ',
      }),
      new ListColumn({
        field: 'eggsGood',
        hide: false,
        header: 'إنتاج بيض سليم',
      }),
      new ListColumn({
        field: 'eggsBroken',
        hide: false,
        header: 'إنتاج بيض كسر',
      }),
      new ListColumn({
        field: 'eggsDouble',
        hide: false,
        header: 'إنتاج بيض دبل',
      }),
      new ListColumn({
        field: 'eggsTotal',
        hide: false,
        header: 'إنتاج بيض كلي',
      }),
      new ListColumn({
        field: 'deadCount',
        hide: false,
        header: 'النافق',
      }),
      new ListColumn({
        field: 'feedConsumed',
        hide: false,
        header: 'المستهلك ',
      }),
      new ListColumn({
        field: 'eggsSold',
        hide: false,
        header: 'مبيعات بيض كام كرتونة ',
      }),
    ];
  }
  getPage() {
    const [start, end] = this.form.value.date ?? [];

    const toISOStringWithoutOffset = (date: Date): string => {
      return new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
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
    this.dailySummaryService
      .getAll(startDate, endDate,this.form.value.cycleId,this.maxResultCount,this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.items;
        this.pageResult.records=response.totalCount
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
    this.form.get('cycleId')?.setValue(null)
        this.form.get('date')?.setValue([new Date(Date.now())])
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
