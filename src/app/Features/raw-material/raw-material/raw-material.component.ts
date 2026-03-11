import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { ItemsService } from 'src/app/Shared/Services/items.service';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.scss',
})
export class RawMaterialComponent {
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
  constructor(private itemService: ItemsService) {}
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
      new ListColumn({
        field: 'pricePerTon',
        hide: false,
        header: 'سعر الوحدة',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
      pricePerTon: new FormControl(null, Validators.required),
      itemType: new FormControl(),
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.form.get('itemType')?.setValue(1)
    this.showForm = true;
  }
  getPage() {
    this.itemService.getItems(this.maxResultCount,this.skipCount,1).subscribe((response: any) => {
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
      this.itemService.update(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تم تعديل بيانات المادة الخام بنجاح، يمكنك المتابعة';
        this.showForm = false;
        this.showSuccessDialog = true;
      });
    } else {
      this.itemService.addItems(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تمت إضافة المادة الخام بنجاح ، يمكنك المتابعة';
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
    this.itemService
      .delete(this.selectedItem.id)
      .subscribe((response: any) => {
        this.successMesg = 'تم حذف المادة الخام بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showConfirmDeleteDialog = false;
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
