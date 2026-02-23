import { Component } from '@angular/core';
import { WorkersService } from '../workers.service';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.scss',
})
export class WorkersListComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedTrader: any;

  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  successMesg: string = '';

  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  customActionMenu: {
    label: string;
    icon?: string;
    img?: string;
    command: (entity: any) => void;
  }[] = [
    {
      label: 'تعديل',
      img: 'assets/images/edit.svg',
      command: (item: any) => this.edit(item),
    },
    {
      label: 'الأجازات',
      icon: 'pi pi-calendar-times text-[#8B5CF6]',
      command: (item: any) => this.vacations(item),
    },
    {
      label: 'السُّلف',
      icon: 'pi pi-money-bill text-[#3B82F6]',
      command: (item: any) => this.advances(item),
    },
  ];
  constructor(private workersService: WorkersService, private router: Router) {}

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
        header: 'الأسم',
      }),
      new ListColumn({
        field: 'phone',
        hide: false,
        header: 'رقم الموبايل',
      }),
      new ListColumn({
        field: 'role',
        hide: false,
        header: 'الدور الوظيفي',
      }),
      new ListColumn({
        field: 'salary',
        hide: false,
        header: 'المرتب',
      }),
      new ListColumn({
        field: 'vacationDays',
        hide: false,
        header: 'رصيد الأجازات',
      }),
    ];
  }

  getPage() {
    this.workersService.getAllWorkers().subscribe((response: any) => {
      if (response.length > 0) {
        response.forEach((element: any) => {
          element.role =
            element.role == 'FarmManager'
              ? 'مدير المزرعة'
              : element.role == 'BarnManager'
              ? 'مدير العنبر'
              : 'عامل العنبر';
          this.pageResult.items = response;
        });
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
    this.selectedTrader = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    // this.workersService
    //   .delete(this.selectedTrader.id)
    //   .subscribe(() => {
    //     this.successMesg = 'تم حذف التاجر بنجاح، يمكنك المتابعة';
    //     this.showSuccessDialog = true;
    //     this.showConfirmDeleteDialog = false;
    //   });
  }

  addNew() {
    this.router.navigate(['/workers/create']);
  }

  edit(item: any) {
    this.router.navigate(['/workers/update/' + item.id]);
  }
  advances(item: any) {
    this.router.navigate(['/workers/advances/' + item.id]);
  }
  vacations(item: any) {
    this.router.navigate(['/workers/vacations/' + item.id]);
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
