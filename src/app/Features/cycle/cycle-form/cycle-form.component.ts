import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmService } from '../../farm/farm.service';
import { CycleService } from '../cycle.service';

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
  farmOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private farmService: FarmService
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
      name: new FormControl(null, Validators.required),
      description: new FormControl(),
      farmID: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(),
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
