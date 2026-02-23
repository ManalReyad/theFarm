import { FarmService } from 'src/app/Features/farm/farm.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CycleService } from '../cycle.service';
import { RoomService } from '../../room/room.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { WorkersService } from '../../workers/workers.service';

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
  farmId: any;
  barnWorkerOptions: { id: number; name: string }[] = [];
  barnManagerOptions: { id: number; name: string }[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private lookupService: LookupService,
    private workersService: WorkersService
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
    this.farmId = Number(localStorage.getItem('farmId'));
    if (this.farmId) {
      this.lookupService
        .getBarnsByFarmId(this.farmId)
        .subscribe((data: any) => {
          this.roomOptions = data || [];
        });
    }
    this.createForm();
    this.getDropdowns()
  }

  getDropdowns() {
    this.workersService.getBarnManagers().subscribe((data: any) => {
      this.barnManagerOptions = data || [];
    });
    this.workersService.getBarnWorkers().subscribe((data: any) => {
      this.barnWorkerOptions = data || [];
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      farmId: new FormControl(),
      barnId: new FormControl(null, Validators.required),
      barnManagerId: new FormControl(null, Validators.required),
      barnWorkerId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      chickCount: new FormControl(null, Validators.required),
      chickAge: new FormControl(null, Validators.required),
    });
  }
  getById(id: any) {
    this.cycleService.getById(id).subscribe((response: any) => {
      this.form.patchValue({
        ...response,
        startDate: new Date(response?.startDate),
        endDate: new Date(response?.endDate),
      });
    });
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmId: +this.farmId });
    if (this.editMode) {
      this.cycleService.update(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تم تعديل بيانات الدورة بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    } else {
      this.cycleService.create(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تمت إضافة الدورة بنجاح ، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }
  backToList() {
    this.router.navigate(['/cycle']);
  }
}
