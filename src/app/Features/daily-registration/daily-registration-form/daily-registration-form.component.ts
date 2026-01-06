import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CycleService } from '../../cycle/cycle.service';
import { DailyRegistrationService } from '../daily-registration.service';
import { RoomService } from '../../room/room.service';
import { FarmService } from '../../farm/farm.service';

@Component({
  selector: 'app-daily-registration-form',
  templateUrl: './daily-registration-form.component.html',
  styleUrl: './daily-registration-form.component.scss',
})
export class DailyRegistrationFormComponent {
  pages: any = [
    { name: 'التسجيلات اليومية', route: '/cycle' },
    { name: 'إضافة تسجيل يومي' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  cycleOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  farmOptions: { id: number; name: string }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private roomService: RoomService,
    private dailyRegisterService: DailyRegistrationService,
    private farmService: FarmService
  ) {}
  ngOnInit(): void {
    let cycleId = this.activatedRoute.snapshot.params['id'];
    if (cycleId) {
      this.getById(cycleId);
      this.editMode = true;
      this.pages = [
        { name: 'التسجيلات اليومية', route: '/daily-registration' },
        { name: 'تعديل تسجيل يومي' },
      ];
    }
    this.getDropdowns();
    this.createForm();
    
  }
  getDropdowns() {

    this.farmService.getList().subscribe((response: any) => {
      this.farmOptions = response.data;
    });
  }
  getRooms(id: any) {
    this.roomService.getList(id).subscribe((response: any) => {
      if (response.success) {
        this.roomOptions = response.data;
      }
    });
    this.cycleService.getList(id).subscribe((response: any) => {
      if (response.success) {
        this.cycleOptions = response.data;
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      deadChicken: new FormControl(null, Validators.required),
      feedUsage: new FormControl(null, Validators.required),
      feedPrice: new FormControl(null, Validators.required),
      medicinePrice: new FormControl(null, Validators.required),
      roomID: new FormControl(null, Validators.required),
      cycleID: new FormControl(null, Validators.required),
      farmID: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
    });
  }
  getById(id: any) {
    this.dailyRegisterService.getById(id).subscribe((response: any) => {
      if (response.success) {
        this.form.patchValue({
          ...response.data,
          date: new Date(response.data.date),
        });
      }
    });
  }
  save() {
    if (this.editMode) {
      this.dailyRegisterService
        .update(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تم تعديل بيانات التسجيل اليومي بنجاح، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
        });
    } else {
      this.dailyRegisterService
        .create(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تمت إضافة التسجيل اليومي بنجاح ، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
        });
    }
  }
  backToList() {
    this.router.navigate(['/daily-registration']);
  }
}
