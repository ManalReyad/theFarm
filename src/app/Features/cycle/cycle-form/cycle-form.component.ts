import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CycleService } from '../cycle.service';
import { RoomService } from '../../room/room.service';

@Component({
  selector: 'app-cycle-form',
  templateUrl: './cycle-form.component.html',
  styleUrl: './cycle-form.component.scss',
})
export class CycleFormComponent {
  pages: any = [
    { name: 'الدورات', route: '/cycle' },
    { name: 'تسجيل بيانات الدورة' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  farmId:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private roomService:RoomService
  ) {}
  ngOnInit(): void {
    let cycleId = this.activatedRoute.snapshot.params['id'];
    if (cycleId) {
      this.getById(cycleId);
      this.editMode = true;
      this.pages = [
        { name: 'الدورات', route: '/cycle' },
        { name: 'تعديل بيانات الدورة' },
      ];
    }
    this.farmId=localStorage.getItem('farmId')||''
    this.getRooms();
    this.createForm();
  }
  getRooms() {
    this.roomService.getList(+this.farmId).subscribe((response: any) => {
      if (response.success) {
        this.roomOptions = response.data;
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      farmId: new FormControl(),
      roomId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      chickenCount: new FormControl(null, Validators.required),
      chickenAge: new FormControl(null, Validators.required),

    });
  }
  getById(id: any) {
    this.cycleService.getById(id).subscribe((response: any) => {
      if (response.success) {
        this.form.patchValue({
          ...response.data,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
        });
      }
    });
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmId: +this.farmId });
    if (this.editMode) {
      this.cycleService.update(this.form.value).subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم تعديل بيانات الدورة بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
        }
      });
    } else {
      this.cycleService.create(this.form.value).subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تمت إضافة الدورة بنجاح ، يمكنك المتابعة';
          this.showSuccessDialog = true;
        }
      });
    }
  }
  backToList() {
    this.router.navigate(['/cycle']);
  }
}
