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
  selectedDepartment: any;
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
        field: 'cycleName',
        hide: false,
        header: 'الدورة',
      }),
      new ListColumn({
        field: 'roomName',
        hide: false,
        header: 'العنبر',
      }),
      new ListColumn({
        field: 'feedPrice',
        hide: false,
        header: 'سعر التغذية',
      }),
      new ListColumn({
        field: 'medicinePrice',
        hide: false,
        header: 'سعر الأدوية',
      }),
      new ListColumn({
        field: 'feedUsage',
        hide: false,
        header: ' التغذية المستخدمة',
      }),
      new ListColumn({
        field: 'deadChicken',
        hide: false,
        header: 'الفراخ الميتة',
      }),
      new ListColumn({
        field: 'remainingChickenCount',
        hide: false,
        header: 'الفراخ المتبقية',
      }),
    ];
  }
  getPage() {
    this.dailyRegisterService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        if (response.success) {
          this.pageResult = response.data;
        }
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
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.dailyRegisterService
      .delete(this.selectedDepartment.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم حذف التسجيل اليومي بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
        }
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
