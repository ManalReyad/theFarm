import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarmService } from '../../farm/farm.service';
import { TreasuryService } from '../treasury.service';
import { PaidType } from '../enums/paid-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treasury-deduction',
  templateUrl: './treasury-deduction.component.html',
  styleUrl: './treasury-deduction.component.scss',
})
export class TreasuryDeductionComponent {
  pages = [{ name: 'الخزنة' }, { name: 'خصم المال من الخزنة' }];
  form!: FormGroup;
  editMode: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  farmOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  paidTypeOptions: { id: number; name: string }[] = [
    {
      id: PaidType.Advance,
      name: 'سلفة',
    },
    {
      id: PaidType.Tip,
      name: 'إكرامية',
    },
    {
      id: PaidType.Puschase,
      name: 'عملية شراء',
    },
  ];
  constructor(
    private farmService: FarmService,
    private treasuryService: TreasuryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getDropdowns();
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      farmID: new FormControl(null, Validators.required),
      paidTypeID: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      employeeID: new FormControl(null),
      merchantID: new FormControl(null),
    });
  }
  getDropdowns() {
    this.farmService.getList().subscribe((response: any) => {
      if (response.success) {
        this.farmOptions = response.data;
      }
    });
  }
  deductMony() {
    this.treasuryService.deductMony(this.form.value).subscribe((response: any) => {
      if (response.success) {
        this.successMesg = 'تمت الخصم  بنجاح ، يمكنك المتابعة';
        this.showSuccessDialog = true;
        this.back();
      }
    });
  }
  back() {
    this.router.navigate(['treasury']);
  }
}
