import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EggProductionService } from '../warehouse/egg-production.service';
import { SharedModule } from "src/app/Shared/shared.module";

@Component({
  selector: 'app-cycle-production-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cycle-production-summary.component.html',
  styleUrl: './cycle-production-summary.component.scss'
})
export class CycleProductionSummaryComponent {
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
    private eggProductionService: EggProductionService,
  ) {}
  ngOnInit(): void {
    this.farmId =Number( localStorage.getItem('farmId'))
    this.intializeListCoulmns();
   this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: 'cycleName',
        hide: false,
        header: 'اسم الدورة',
      }),
      new ListColumn({
        field: 'totalCartons',
        hide: false,
        header: 'اجمالي الأطباق',
      }),
        new ListColumn({
        field: 'normalEggs',
        hide: false,
        header: 'بيض سليم',
      }),
      new ListColumn({
        field: 'brokenEggs',
        hide: false,
        header: 'بيض كسر',
      }),
      new ListColumn({
        field: 'doubleEggs',
        hide: false,
        header: 'بيض دبل',
        isDate: true,
      }),
      new ListColumn({
        field: 'farzaEggs',
        hide: false,
        header: 'بيض فرزة',
        isDate: true,
      }),
    ];
  }
  getPage() {
    this.eggProductionService
      .getSummaryEggProductionByCycle(this.farmId,this.maxResultCount,this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.data;
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
