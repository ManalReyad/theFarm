import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { BonusService } from './bonus.service';
import { SharedModule } from "src/app/Shared/shared.module";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.scss',
  standalone:true,
  imports: [SharedModule]
})
export class BonusComponent {
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

  constructor(
    private bonusService: BonusService,
  ) {}
  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmId');
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
        header: 'الاسم',
      }),
      new ListColumn({
        field: 'salary',
        hide: false,
        header: 'الراتب',
      }),
      new ListColumn({
        field: 'achievement',
        hide: false,
        header: 'نسبة الإنتاجية',
      }),
      new ListColumn({
        field: 'bonusPercent',
        hide: false,
        header: 'نسبة المكافأة',
      }),
      new ListColumn({
        field: 'bonusAmount',
        hide: false,
        header: 'قيمة المكافأة',
      }),
      new ListColumn({
        field: 'totalSalary',
        hide: false,
        header: 'مجموع الراتب',
      }),
    ];
  }
  getPage() {
    this.bonusService
      .getAll(this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.workers;
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
}
