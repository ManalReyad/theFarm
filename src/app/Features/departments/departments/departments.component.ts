import { Component } from '@angular/core';
import { FilterDataParams } from 'src/app/Shared/Models/filterDataParam';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { DepartmentsService } from '../departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent {
  columns: ListColumn[] = [];
  pageResult!: PageResult;
  filteredDate = new FilterDataParams();
  selectedDepartment: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  form!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  maxResultCount: number = 10;
  searchReset: boolean = false;
  constructor(private departmentService: DepartmentsService) {}
  ngOnInit(): void {
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
        field: 'name',
        hide: false,
        header: 'الاسم',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.showForm = true;
  }
  getPage() {
    this.departmentService
      .getAll(this.filteredDate)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.pageResult = response.data;
        }
      });
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
  }
  save() {
    if (this.editMode) {
      this.departmentService
        .update(this.form.value)
        .subscribe((response: any) => {
          if (response.isSuccess) {
            this.successMesg =
              'تم تعديل بيانات جهة العمل بنجاح، يمكنك المتابعة';
            this.showForm = false;
            this.showSuccessDialog = true;
          }
        });
    } else {
      this.departmentService
        .create(this.form.value)
        .subscribe((response: any) => {
          if (response.isSuccess) {
            this.successMesg =
              'تمت إضافة جهة العمل بنجاح إلى قائمة جهات العمل، يمكنك المتابعة';
            this.showForm = false;
            this.showSuccessDialog = true;
          }
        });
    }
  }
  showWarnningMessage() {
    this.showWarnningDialog = true;
  }
  onPageChanged(event: any) {
    this.filteredDate.skipCount = event.first;
    this.filteredDate.maxResultCount = event.rows;
    this.maxResultCount = event.rows;
    this.getPage();
  }
  search(value: string) {
    if (value) {
      this.searchMode = true;
    } else {
      this.searchMode = false;
    }
    this.filteredDate.searchTerm = value;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.filteredDate.skipCount = 0;
    this.filteredDate.searchTerm = '';
    this.searchMode = false;
    this.filteredDate.maxResultCount = this.maxResultCount;
    this.getPage();
  }
  delete(item: any) {
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.departmentService
      .delete(this.selectedDepartment.id)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.successMesg = 'تم حذف جهة العمل بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
        }
      });
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
