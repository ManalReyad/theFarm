import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrl: './advances.component.scss'
})
export class AdvancesComponent {
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
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  workerId:any
  pages: any = [
    { name: 'الموظفين', route: '/workers' },
    { name: 'السُّلف' },
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
        field: 'amount',
        hide: false,
        header: 'قيمة السلفة',
      }),
      new ListColumn({
        field: 'date',
        hide: false,
        header: 'تاريخ السُلفة',
        isDate:true
      }),
      new ListColumn({
        field: 'cumulativeAmount',
        hide: false,
        header: 'إجمالي السُّلف',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      workerId: new FormControl(null, Validators.required),
      date:new FormControl(null, Validators.required),
      amount:new FormControl(null, Validators.required),

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
      .getWorkerAdvances(this.workerId)
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
      this.workersService.createAdvance(this.form.value).subscribe((response: any) => {
       this.successMesg = 'تمت إضافة طلب السُلفة بنجاح';
          this.showForm = false;
          this.showSuccessDialog = true;
      });
    }
  }
  showWarnningMessage() {
    this.showWarnningDialog = true;
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
