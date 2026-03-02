import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-cycle-listing',
  templateUrl: './cycle-listing.component.html',
  styleUrl: './cycle-listing.component.scss',
})
export class CycleListingComponent {
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
      label: 'حذف',
      img: 'assets/images/delete.svg',
      command: (item: any) => this.delete(item),
    },
    {
      label: 'إنشاء تقييم',
      icon: 'pi pi-star text-[#f59e0b]',
      command: (item: any) => this.addEvaluation(item),
    },
    {
      label: 'التقييمات',
      icon: 'pi pi-list text-[#7c3aed]',
      command: (item: any) => this.goToEvaluations(item),
    },
  ];
  constructor(private cycleService: CycleService, private router: Router) {}
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
        header: 'الاسم',
      }),
      new ListColumn({
        field: 'barnName',
        hide: false,
        header: 'العنبر',
      }),
      new ListColumn({
        field: 'startDate',
        hide: false,
        header: 'تاريخ البداية',
        isDate: true,
      }),
      new ListColumn({
        field: 'endDate',
        hide: false,
        header: 'تاريخ النهاية',
        isDate: true,
      }),
      new ListColumn({
        field: 'chickCount',
        hide: false,
        header: 'عدد الفراخ',
      }),
      new ListColumn({
        field: 'chickAge',
        hide: false,
        header: 'عمر الفراخ',
      }),
      new ListColumn({
        field: 'finalScore',
        hide: false,
        header: 'التقييم',
      }),
    ];
  }
  addEvaluation(item: any) {
    this.router.navigate(['/cycle/evaluation/create/' + item.id], {
      queryParams: { name: item.name },
    });
  }
  goToEvaluations(item: any) {
    this.router.navigate(['/cycle/evaluations/' + item.id], {
      queryParams: { name: item.name },
    });
  }
  getPage() {
    this.cycleService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        this.pageResult.items = response;
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
    this.cycleService
      .delete(this.selectedItem.id)
      .subscribe((response: any) => {
        this.successMesg = 'تم حذف الدورة بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showConfirmDeleteDialog = false;
      });
  }
  addNew() {
    this.router.navigate(['/cycle/create']);
  }
  edit(data: any) {
    this.router.navigate(['/cycle/update/' + data.id]);
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
