import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { CycleService } from '../../cycle/cycle.service';
import { DailyRegistrationService } from '../daily-registration.service';

@Component({
  selector: 'app-daily-registration-listing',
  templateUrl: './daily-registration-listing.component.html',
  styleUrl: './daily-registration-listing.component.scss',
})
export class DailyRegistrationListingComponent {
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
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  constructor(
    private dailyRegisterService: DailyRegistrationService,
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
        field: 'date',
        hide: false,
        header: 'التاريخ',
        isDate:true
      }),
      new ListColumn({
        field: 'dayName',
        hide: false,
        header: 'اليوم',
      }),
      new ListColumn({
        field: 'chickAge',
        hide: false,
        header: 'عمر الفراخ',
      }),
      new ListColumn({
        field: 'deadCount',
        hide: false,
        header: 'النافق اليومي',
      }),
      new ListColumn({
        field: 'deadCumulative',
        hide: false,
        header: 'النافق التراكمي',
      }),
      new ListColumn({
        field: 'remainingChicks',
        hide: false,
        header: 'صافي العدد بعد النافق',
      }),
      new ListColumn({
        field: 'feedQuantityTotal',
        header: 'استهلاك وزن العلف'
      }),
      new ListColumn({
        field: 'feedCostTotal',
        header: 'سعر استهلاك العلف'
      }),
      new ListColumn({
        field: 'medicineQuantityTotal',
        header: 'استهلاك الأدوية'
      }),
      new ListColumn({
        field: 'medicineCostTotal',
        header: 'سعر استهلاك الأدوية'
      }),
    ];
  }
  getPage() {
    this.dailyRegisterService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
  
        this.pageResult.items = response.map((item:any) => {
  
          const feedQuantityTotal = item.feedConsumptions?.reduce(
            (sum:any, el:any) => sum + (el.quantity || 0),
            0
          );
  
          const feedCostTotal = item.feedConsumptions?.reduce(
            (sum:any, el:any) => sum + (el.cost || 0),
            0
          );
  
          const medicineQuantityTotal = item.medicineConsumptions?.reduce(
            (sum:any, el:any) => sum + (el.quantity || 0),
            0
          );
  
          const medicineCostTotal = item.medicineConsumptions?.reduce(
            (sum:any, el:any) => sum + (el.cost || 0),
            0
          );
  
          return {
            ...item,
            feedQuantityTotal,
            feedCostTotal,
            medicineQuantityTotal,
            medicineCostTotal
          };
        });
  
      });
  }
  onPageChanged(event: any) {
    this.pageNumber = event.first;
    this.pageSize = event.rows;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.pageNumber = 1;
    this.getPage();
  }
  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.dailyRegisterService
      .delete(this.selectedItem.id)
      .subscribe((response: any) => {
        this.successMesg = 'تم حذف التسجيل اليومي بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showConfirmDeleteDialog = false;
      });
  }
  addNew() {
    this.router.navigate(['/daily-registration/create']);
  }
  edit(data: any) {
    this.router.navigate(['/daily-registration/update/' + data.item.id]);
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
