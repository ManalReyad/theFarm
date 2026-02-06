import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FarmService } from '../../farm/farm.service';
import { RoomType } from '../enums/room-type';

@Component({
  selector: 'app-room-listing',
  templateUrl: './room-listing.component.html',
  styleUrls: ['./room-listing.component.scss'],
})
export class RoomListingComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedDepartment: any;
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
  form!: FormGroup;
  farmOptions: { id: number; name: string }[] = [];
  roomTypeOptions: { id: number; name: string }[] = [
    { id: RoomType.ForEgg, name: 'بياض' },
    { id: RoomType.ForChicken, name: 'تسمين' },
  ];
  farmId: any;
  constructor(
    private roomService: RoomService,
    private router: Router,
    private farmService: FarmService
  ) {}
  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmId');
    this.intializeListCoulmns();
    this.getPage();
    this.getDropdowns();
    this.createForm();
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
        field: 'roomTypeName',
        hide: false,
        header: 'نوع العنبر',
      }),
      new ListColumn({
        field: 'farmName',
        hide: false,
        header: 'المزرعة',
      }),
    ];
  }
  getPage() {
    this.roomService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        if (response.success) {
          this.pageResult = response.data;
        }
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
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.roomService
      .delete(this.selectedDepartment.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم حذف العنبر بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
        }
      });
  }
  addNew() {
    this.editMode = false;
    this.form.reset();
    this.showForm = true;
  }
  edit(object: any) {
    this.showForm = true;
    this.editMode = true;
    this.form.patchValue({
      ...object.item,
      roomTypeID: object.item.roomTypeId,
      farmID: this.farmId,
    });
  }
  getDropdowns() {
    this.farmService.getList().subscribe((response: any) => {
      if (response.success) {
        this.farmOptions = response.data;
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      farmID: new FormControl(this.farmId),
      roomTypeID: new FormControl(null, Validators.required),
    });
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmID: +this.farmId });

    if (this.editMode) {
      this.roomService.update(this.form.value).subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم تعديل بيانات العنبر بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.editMode = false;
          this.showForm = false;
        }
      });
    } else {
      this.roomService.create(this.form.value).subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تمت إضافة العنبر بنجاح ، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showForm = false;
        }
      });
    }
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
  goToRoomAssets(data: any) {
    this.router.navigate(['room/room-assets/' + data.id]);
  }
}
