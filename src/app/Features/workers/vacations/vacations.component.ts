import { Component } from '@angular/core';
import { WorkersService } from '../workers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrl: './vacations.component.scss'
})
export class VacationsComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  form!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  workerId:any
  pages: any = [
    { name: 'الموظفين', route: '/workers' },
    { name: 'الأجازات' },
  ];
  constructor(private workersService: WorkersService,private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this.workerId=this.activatedRoute.snapshot.params['id']
    this.createForm();
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
        field: 'workerName',
        hide: false,
        header: 'اسم الموظف',
      }),
      new ListColumn({
        field: 'days',
        hide: false,
        header: 'عدد الأيام ',
      }),
      new ListColumn({
        field: 'startDate',
        hide: false,
        header: 'تاريخ البداية',
        isDate:true
      }),
      new ListColumn({
        field: 'endDate',
        hide: false,
        header: 'تاريخ النهاية',
        isDate:true
      }),
      new ListColumn({
        field: 'cumulativeDays',
        hide: false,
        header: 'إجمالي الإجازات',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      workerId: new FormControl(null, Validators.required),
      startDate:new FormControl(null, Validators.required),
      endDate:new FormControl(null, Validators.required),

    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.form.get('workerId')?.setValue(this.workerId)
    this.showForm = true;
  }
  getPage() {
    this.workersService
      .getWorkerVacations(this.workerId)
      .subscribe((response: any) => {
        this.pageResult.items = response;
      });
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
  }
  save() {
    if (this.editMode) {
      // this.workersService.update(this.form.value).subscribe((response: any) => {
      //  this.successMesg = 'تم تعديل بيانات المزرعة بنجاح، يمكنك المتابعة';
      //     this.showForm = false;
      //     this.showSuccessDialog = true;
      // });
    } else {
      this.workersService.createVacation(this.form.value).subscribe((response: any) => {
       this.successMesg = 'تمت إضافة طلب الإجازة بنجاح';
          this.showForm = false;
          this.showSuccessDialog = true;
      });
    }
  }
  showWarnningMessage() {
    this.showWarnningDialog = true;
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
    // this.workersService
    //   .delete(this.selectedItem.id)
    //   .subscribe((response: any) => {
    //  this.successMesg = 'تم حذف المزرعة بنجاح، يمكنك المتابعة';
    //       this.showSuccessDialog = true;
    //       this.showConfirmDeleteDialog = false;
    //   });
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
