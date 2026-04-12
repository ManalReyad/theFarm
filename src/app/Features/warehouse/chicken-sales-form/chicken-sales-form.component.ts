import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { ChickenSalesService } from '../chicken-sales.service';

@Component({
  selector: 'app-chicken-sales-form',
  templateUrl: './chicken-sales-form.component.html',
  styleUrl: './chicken-sales-form.component.scss'
})
export class ChickenSalesFormComponent {
  pages: any = [
    { name: 'قائمة مبيعات الفراخ', route: '/warehouse/chicken-sales' },
    { name: 'تسجيل بيانات مبيعات الفراخ' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  buyersOptions: { id: number; name: string }[] = [];
  cycleOptions: { id: number; name: string }[] = [];
  farmId: any;
  barnId: any;
  constructor(
    private router: Router,
    private lookupService: LookupService,
    private chickenSalesService: ChickenSalesService,
  ) {}   
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    if (this.farmId) {
      this.lookupService.getActiveCycles(this.farmId).subscribe((response: any) => {
           this.cycleOptions =
          response?.length > 0
            ? response.map((item: any) => {
                return { id: item.id, name: item.cycleName };
              })
            : [];
      });
    }
    this.createForm();
    this.getDropdown()
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      cycleId: new FormControl(null, Validators.required),
      traderId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      paidAmount: new FormControl(null, Validators.required),
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
  }
  save() {
    this.chickenSalesService.setChickenSales(this.form.value).subscribe((response: any) => {
      this.successMesg = 'تم إضافة بيانات مبيعات الفراخ بنجاح، يمكنك المتابعة';
      this.showSuccessDialog = true;
    });
  }
  backToList() {
    this.router.navigate(['/warehouse/chicken-sales']);
  }
}
