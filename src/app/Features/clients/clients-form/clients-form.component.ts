import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TradersService } from '../../traders/traders.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrl: './clients-form.component.scss'
})
export class ClientsFormComponent {
  pages: any = [
    { name: 'العملاء', route: '/clients' },
    { name: 'تسجيل بيانات العميل' },
  ];

  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tradersService: TradersService
  ) {}

  ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.params['id'];
    if (clientId) {
      this.getById(clientId);
      this.editMode = true;
      this.pages = [
        { name: 'العملاء', route: '/traders' },
        { name: 'تعديل بيانات العميل' },
      ];
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      type: new FormControl(2, Validators.required),
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
        this.successMesg = 'تم تعديل بيانات العميل بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    } else {
      this.tradersService.create(this.form.value).subscribe(() => {
        this.successMesg = 'تم إضافة بيانات العميل بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/clients']);
  }
}
