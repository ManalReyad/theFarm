import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { BreedsService } from './breeds.service';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss',
  imports: [SharedModule, ReactiveFormsModule, DialogModule,CommonModule],
  standalone:true
})
export class BreedsComponent {
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
  constructor(private breedsService: BreedsService) {}
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
    this.breedsService
      .getAll(this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
      this.pageResult = {
  ...this.pageResult,
  items: response.breeds || [],
  records: response.totalCount
};
      });
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
  }
  save() {
    if (this.editMode) {
      // this.breedsService.update(this.form.value).subscribe((response: any) => {
      //  this.successMesg = 'تم تعديل بيانات السلالة بنجاح، يمكنك المتابعة';
      //     this.showForm = false;
      //     this.showSuccessDialog = true;
      // });
    } else {
      this.breedsService.create(this.form.value).subscribe((response: any) => {
       this.successMesg = 'تمت إضافة السلالة بنجاح ، يمكنك المتابعة';
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
    this.skipCount=event.first ;
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
    this.breedsService
      .delete(this.selectedItem.id)
      .subscribe((response: any) => {
     this.successMesg = 'تم حذف السلالة بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
      }, (error) => {
        this.showConfirmDeleteDialog = false;
      },);
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
