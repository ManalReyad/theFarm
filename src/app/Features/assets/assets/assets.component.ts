import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
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
  constructor(private assetService: AssetService) {}
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
    this.assetService
      .getAll(this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.items;
        this.pageResult.records=response.totalCount

      });
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
  }
  save() {
    if (this.editMode) {
      this.assetService.update(this.form.value).subscribe((response: any) => {
        if (response) {
          this.successMesg = 'تمت تعديل الأصل بنجاح ، يمكنك المتابعة';
          this.showForm = false;
          this.showSuccessDialog = true;
        }
      });
    } else {
      this.assetService.create(this.form.value).subscribe((response: any) => {
        if (response) {
          this.successMesg = 'تمت إضافة الأصل بنجاح ، يمكنك المتابعة';
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

  // submitDelete() {
  //   this.assetService
  //     .delete(this.selectedItem.id)
  //     .subscribe((response: any) => {
  //       if (response.success) {
  //         this.successMesg = 'تم حذف الأصل بنجاح، يمكنك المتابعة';
  //         this.showSuccessDialog = true;
  //         this.showConfirmDeleteDialog = false;
  //       }
  //     });
  // }

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
