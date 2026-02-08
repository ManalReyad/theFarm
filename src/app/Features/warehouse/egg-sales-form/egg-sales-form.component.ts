import { Component } from '@angular/core';
import { EggSalesService } from '../egg-sales.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { TradersService } from '../../traders/traders.service';

@Component({
  selector: 'app-egg-sales-form',
  templateUrl: './egg-sales-form.component.html',
  styleUrl: './egg-sales-form.component.scss'
})
export class EggSalesFormComponent {
  pages: any = [
    { name: 'قائمة مبيعات البيض', route: '/warehouse/egg-sales' },
    { name: 'تسجيل بيانات مبيعات البيض' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  tradersOptions: { id: number; name: string }[] = [];
  warehouseOptions: any[] = [];
  farmId: any;
  barnId: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eggSalesService: EggSalesService,
    private tradersService: TradersService
  ) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    this.createForm();
    this.getDropdown()
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      traderId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      warehouseId: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
      unitPrice: new FormControl(null, Validators.required),
      paidAmount: new FormControl(null, Validators.required),
      notes: new FormControl(null),
    });
  }
  getDropdown()
  {
    this.tradersService.getList().subscribe((data:any)=>{
      this.tradersOptions=data?.map((item:any)=>{return {name:item.name,id:item.id}})
    })
  }
  save() {
    this.eggSalesService.setEggSales(this.form.value).subscribe((response: any) => {
      this.successMesg = 'تم إضافة بيانات مبيعات البيض بنجاح، يمكنك المتابعة';
      this.showSuccessDialog = true;
    });
  }
  backToList() {
    this.router.navigate(['/warehouse/egg-production']);
  }
}
