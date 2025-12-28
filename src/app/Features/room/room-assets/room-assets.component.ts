import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { RoomService } from '../room.service';
import { AssetService } from '../../assets/asset.service';
import { RoomAssetService } from './room-asset.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-assets',
  templateUrl: './room-assets.component.html',
  styleUrl: './room-assets.component.scss',
})
export class RoomAssetsComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedDepartment: any;
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
  roomOptions: any[] = [];
  assetsOptions: any[] = [];
  roomID: any;
  constructor(
    private roomAssetService: RoomAssetService,
    private roomService: RoomService,
    private assetService: AssetService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDropdowns();
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
        field: 'assetName',
        hide: false,
        header: 'اسم العنبر',
      }),
      new ListColumn({
        field: '',
        hide: false,
        header: 'الأصل',
      }),
      new ListColumn({
        field: 'assetCount',
        hide: false,
        header: 'عدد الأصل',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      roomID: new FormControl(
        this.roomID ? +this.roomID : null,
        Validators.required
      ),
      assetID: new FormControl(null, Validators.required),
      assetCount: new FormControl(null, Validators.required),
    });
  }
  getDropdowns() {
    this.roomService.getList().subscribe((result: any) => {
      this.roomOptions = result.data;
      this.roomID = this.activatedRoute.snapshot.params['id'];
      this.createForm();
    });
    this.assetService.getList().subscribe((result: any) => {
      this.assetsOptions = result.data;
    });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.showForm = true;
    this.createForm();    
  }
  getPage() {
    this.roomAssetService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        if (response.success) {
          this.pageResult = { items: response.data };
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
      this.roomAssetService
        .update(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg = 'تم تعديل بيانات الأصل بنجاح، يمكنك المتابعة';
            this.showForm = false;
            this.showSuccessDialog = true;
          }
        });
    } else {
      this.roomAssetService
        .create(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
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
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.roomAssetService
      .delete(this.selectedDepartment.id)
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
