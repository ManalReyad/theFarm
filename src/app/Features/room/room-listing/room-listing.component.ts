import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomType } from '../enums/room-type';

@Component({
  selector: 'app-room-listing',
  templateUrl: './room-listing.component.html',
  styleUrls: ['./room-listing.component.scss'],
})
export class RoomListingComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
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
  ) {}
  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmId');
    this.intializeListCoulmns();
    this.getPage();
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
        field: 'typeName',
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
      .getAll(this.maxResultCount, this.skipCount)
      .subscribe((response: any) => {
        this.pageResult.items = response.barns;
        this.pageResult.records = response.totalCount;
      });
  }
  onPageChanged(event: any) {
    this.maxResultCount = event.rows;
    this.skipCount = event.first;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.skipCount = 0;
    this.getPage();
  }
  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.roomService.delete(this.selectedItem.id).subscribe(
      (response: any) => {
        this.successMesg = 'تم حذف العنبر بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showConfirmDeleteDialog = false;
      },
      (error) => {
        this.showConfirmDeleteDialog = false;
      },
    );
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
      type: object.item.type,
      farmId: this.farmId,
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      farmId: new FormControl(this.farmId),
      type: new FormControl(null, Validators.required),
    });
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmId: +this.farmId });

    if (this.editMode) {
      this.roomService.update(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تم تعديل بيانات العنبر بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.editMode = false;
        this.showForm = false;
      });
    } else {
      this.roomService.create(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تمت إضافة العنبر بنجاح ، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.showForm = false;
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
