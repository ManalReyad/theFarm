import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { WharehouseAssetsService } from '../wharehouse-assets.service';
import { AssetService } from '../../assets/asset.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-wharehouse-assets',
  templateUrl: './wharehouse-assets.component.html',
  styleUrl: './wharehouse-assets.component.scss',
})
export class WharehouseAssetsComponent {
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
  warehouseAsset: any = undefined;
  showAddWarehouseForm: boolean = false;
  warehouseForm!: FormGroup;
  farmId!: number;
  assetItemsOptions: { id: number; name: string }[] = [];
  constructor(
    private wharehouseAssetService: WharehouseAssetsService,
    private lookupService: LookupService,
  ) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    this.createForm();
    this.intializeListCoulmns();
    this.getDrodowns();
    if (this.farmId) {
   this.getPage()
    }
  }
  getDrodowns() {
    this.lookupService.getAssetItems().subscribe((response: any) => {
      this.assetItemsOptions = response || [];
    });
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
        field: 'assetItemName',
        hide: false,
        header: 'الأصل',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'العدد',
      }),
      new ListColumn({
        field: 'unitPrice',
        hide: false,
        header: 'سعر الوحدة',
      }),
      new ListColumn({
        field: 'totalValue',
        hide: false,
        header: 'السعر الكلي',
      }),
    ];
  }
  createForm() {
    this.warehouseForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.form = new FormGroup({
      id: new FormControl(0),
      assetWarehouseId: new FormControl(
        this.warehouseAsset?.id,
        Validators.required,
      ),
      assetItemId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      unitPrice: new FormControl(null, Validators.required),
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.form.get('assetWarehouseId')?.setValue(this.warehouseAsset.id);
    this.showForm = true;
  }
  getPage() {
       this.wharehouseAssetService
        .getAssetWarehouseByFarm(this.farmId)
        .subscribe((data:any) => {
          this.warehouseAsset = data;
          this.pageResult.items=data.items
        });
    
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({ ...object.item });
  }
  saveWarehoseAsset() {
    let body = { ...this.warehouseForm.value, farmId: this.farmId };
    this.wharehouseAssetService
      .createWarehouseAsset(body)
      .subscribe((response: any) => {
        this.successMesg = 'تمت إضافة مخزن الأصل بنجاح ، يمكنك المتابعة';
        this.showAddWarehouseForm = false;
        this.showSuccessDialog = true;

      });
  }
  save() {
    this.wharehouseAssetService
      .createAsset(this.form.value)
      .subscribe((response: any) => {
        this.successMesg = 'تمت إضافة الأصل بنجاح ، يمكنك المتابعة';
        this.showForm = false;
        this.showSuccessDialog = true;
      });
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
    this.wharehouseAssetService
      .delete(this.selectedItem?.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم حذف الأصل بنجاح، يمكنك المتابعة';
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
