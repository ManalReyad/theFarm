import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EggProductionService } from '../egg-production.service';

@Component({
  selector: 'app-egg-production',
  templateUrl: './egg-production.component.html',
  styleUrl: './egg-production.component.scss'
})
export class EggProductionComponent {
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
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.farmId =Number( localStorage.getItem('farmId'))
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
        field: 'barnName',
        hide: false,
        header: 'العنبر',
      }),
      new ListColumn({
        field: 'eggQuality',
        hide: false,
        header: 'النوع',
      }),
        new ListColumn({
        field: 'cartonsCount',
        hide: false,
        header: 'العدد(طبق)',
      }),
      new ListColumn({
        field: 'day',
        hide: false,
        header: 'اليوم',
      }),
      new ListColumn({
        field: 'date',
        hide: false,
        header: 'التاريخ',
        isDate: true,
      }),
    ];
  }
  getPage() {
    this.eggProductionService
      .getEggProudctionByFarm(this.farmId,this.maxResultCount,this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.eggRecords;
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
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  addNew() {
    this.router.navigate(['/warehouse/egg-production/add']);
  }
  edit(data: any) {
    this.router.navigate(['/cycle/update/' + data.item.id]);
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
