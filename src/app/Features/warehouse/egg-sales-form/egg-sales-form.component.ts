import { Component } from '@angular/core';
import { EggSalesService } from '../egg-sales.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { TradersService } from '../../traders/traders.service';
import { WarehouseService } from '../warehouse.service';

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
  buyersOptions: { id: number; name: string }[] = [];
  warehouseOptions: { id: number; name: string }[] = [];
  farmId: any;
  barnId: any;
  eggQualityOptions = [
    { id: 1, name: 'سليم' },
    { id: 2, name: 'كسر' },
    { id: 3, name: 'دبل' },
  ];
  constructor(
    private router: Router,
    private lookupService: LookupService,
    private eggSalesService: EggSalesService,
    private warehouseService:WarehouseService

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
      eggQuality: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
      unitPrice: new FormControl(null, Validators.required),
      notes: new FormControl(null),
    });
  }
  getDropdown()
  {
    this.lookupService.getBuyers().subscribe((data:any)=>{
      this.buyersOptions=data?.map((item:any)=>{return {name:item.name,id:item.id}})
    })
    //dropdown-needed
    this.warehouseService.getAll().subscribe((res: any) => {
      this.warehouseOptions =
        res.map((item: any) => {
          return { name: item.name, id: item.id };
        }) || [];
    });
  
  }
  save() {
    this.eggSalesService.setEggSales(this.form.value).subscribe((response: any) => {
      this.successMesg = 'تم إضافة بيانات مبيعات البيض بنجاح، يمكنك المتابعة';
      this.showSuccessDialog = true;
    });
  }
  backToList() {
    this.router.navigate(['/warehouse/egg-sales']);
  }
}
