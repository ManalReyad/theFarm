import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TradersService } from '../traders.service';

@Component({
  selector: 'app-traders-form',
  templateUrl: './traders-form.component.html',
  styleUrl: './traders-form.component.scss'
})
export class TradersFormComponent {
  pages: any = [
    { name: 'الموردين', route: '/traders' },
    { name: 'تسجيل بيانات المورد' },
  ];

  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;

  traderTypeOptions = [
    { id: 1, name: 'مورد' },
    { id: 2, name: 'موزّع' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tradersService: TradersService
  ) {}

  ngOnInit(): void {
    const traderId = this.activatedRoute.snapshot.params['id'];
    if (traderId) {
      this.getById(traderId);
      this.editMode = true;
      this.pages = [
        { name: 'الموردين', route: '/traders' },
        { name: 'تعديل بيانات المورد' },
      ];
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      type: new FormControl(1, Validators.required),
      balance: new FormControl(0),
    });
  }

  getById(id: any) {
    this.tradersService.getById(id).subscribe((response: any) => {
      this.form.patchValue(response);
    });
  }

  save() {
    if (this.editMode) {
      this.tradersService.update(this.form.value).subscribe(() => {
        this.successMesg = 'تم تعديل بيانات المورد بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    } else {
      this.tradersService.create(this.form.value).subscribe(() => {
        this.successMesg = 'تم إضافة بيانات المورد بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/traders']);
  }
}
