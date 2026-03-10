import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-listing',
  templateUrl: './warehouse-listing.component.html',
  styleUrl: './warehouse-listing.component.scss',
})
export class WarehouseListingComponent {
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
  farmId: any;
  constructor(private warehouseService: WarehouseService) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
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
        field: 'farmName',
        hide: false,
        header: 'المزرعة',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
      farmId: new FormControl(),
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.form.get('farmId')?.setValue(this.farmId);
    this.showForm = true;
  }
  getPage() {
    this.warehouseService.getWarehouse().subscribe((response: any) => {
      this.pageResult.items = response;
    });
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
    this.form.get('farmId')?.setValue(this.farmId);

  }
  save() {
    if (this.editMode) {
      this.warehouseService
        .updateWarehouse(this.form.value)
        .subscribe((response: any) => {
          this.successMesg = 'تمت تعديل المخزن بنجاح ، يمكنك المتابعة';
          this.showForm = false;
          this.showSuccessDialog = true;
        });
    } else {
      this.warehouseService
        .createWarehouse(this.form.value)
        .subscribe((response: any) => {
          this.successMesg = 'تمت إضافة المخزن بنجاح ، يمكنك المتابعة';
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
    this.warehouseService
      .deleteWarehouse(this.selectedItem.id)
      .subscribe((response: any) => {
     this.successMesg = 'تم حذف المخزن بنجاح، يمكنك المتابعة';
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
