import { Component } from '@angular/core';
import { WorkersService } from '../workers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workers-form',
  templateUrl: './workers-form.component.html',
  styleUrl: './workers-form.component.scss',
})
export class WorkersFormComponent {
  pages: any = [
    { name: 'الموظفين', route: '/workers' },
    { name: 'تسجيل بيانات الموظف' },
  ];

  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;

  workerTypeOptions = [
    { id: 1, name: 'مدير المزرعة ' },
    { id: 2, name: 'مدير العنبر' },
    { id: 3, name: 'عامل العنبر' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workersService: WorkersService
  ) {}

  ngOnInit(): void {
    const traderId = this.activatedRoute.snapshot.params['id'];
    if (traderId) {
      this.getById(traderId);
      this.editMode = true;
      this.pages = [
        { name: 'الموظفين', route: '/workers' },
        { name: 'تعديل بيانات الموظف' },
      ];
    }
    this.createForm();
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      salary: new FormControl(null, Validators.required),
      vacationDays: new FormControl(null, Validators.required),
    });
  }

  getById(id: any) {
    this.workersService.getWorkerById(id).subscribe((response: any) => {
      this.form.patchValue(response);
    });
  }

  save() {
    if (this.editMode) {
      this.workersService.updateWorker(this.form.value).subscribe(() => {
        this.successMesg = 'تم تعديل بيانات الموظف بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    } else {
      this.workersService.createWorker(this.form.value).subscribe(() => {
        this.successMesg = 'تم إضافة بيانات الموظف بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/workers']);
  }
}
