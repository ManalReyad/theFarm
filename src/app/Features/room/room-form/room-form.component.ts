import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarmService } from '../../farm/farm.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  pages: any = [{name:'العنابر',route:'/room'},{ name: 'تسجيل بيانات العنبر' }];
  form!: FormGroup;
  editMode: boolean = false;
  farmOptions: { id: number; name: string }[] = [];
  roomTypeOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private farmService: FarmService
  ) {}
  ngOnInit(): void {
    let roomId = this.activatedRoute.snapshot.params['id'];
    if (roomId) {
      this.getById(roomId);
      this.editMode = true;
      this.pages = [{name:'العنابر',route:'/room'},{ name: 'تعديل بيانات العنبر' }];
    }
    this.getDropdowns();
    this.createForm();
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
      name: new FormControl(null,Validators.required),
      description: new FormControl(),
      farmID: new FormControl(null,Validators.required),
      chickenCount: new FormControl(null,Validators.required),
      roomTypeID: new FormControl(),
    });
  }
  getById(id: any) {
    this.roomService.getById(id).subscribe((response: any) => {
      if (response.success) {
        this.form.patchValue({ ...response.data });
      }
    });
  }
  save()
  {
     if (this.editMode) {
      this.roomService
        .update(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تم تعديل بيانات العنبر بنجاح، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
        });
    } else {
      this.roomService
        .create(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تمت إضافة العنبر بنجاح ، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
        });
    }
  }
  backToList() {
    this.router.navigate(['/room']);
  }
}
