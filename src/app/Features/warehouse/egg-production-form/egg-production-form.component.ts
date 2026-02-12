import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { EggProductionService } from '../egg-production.service';

@Component({
  selector: 'app-egg-production-form',
  templateUrl: './egg-production-form.component.html',
  styleUrl: './egg-production-form.component.scss',
})
export class EggProductionFormComponent {
  pages: any = [
    { name: 'قائمة إنتاج البيض', route: '/warehouse/egg-production' },
    { name: 'تسجيل بيانات إنتاج البيض' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  cycleOptions: any[] = [];
  farmId: any;
  barnId: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eggProductionService: EggProductionService,
    private lookupService: LookupService
  ) {}
  ngOnInit(): void {
    let cycleId = this.activatedRoute.snapshot.params['id'];
    if (cycleId) {
      this.getById(cycleId);
      this.editMode = true;
      this.pages = [
        { name: 'قائمة إنتاج البيض', route: '/warehouse/egg-production' },
        { name: 'تعديل بيانات إنتاج البيض' },
      ];
    }
    this.farmId = Number(localStorage.getItem('farmId'));
    if (this.farmId) {
      this.lookupService.getActiveCycles(this.farmId).subscribe((data: any) => {
        this.cycleOptions = data.map((item:any)=>{return{id:item.id,name:item.cycleName,barnName:item.barnName}}) || [];
      });
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      cycleId: new FormControl(null, Validators.required),
      farmId: new FormControl(this.farmId),
      barnId: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
      cartonsCount: new FormControl(null, Validators.required),
      notes: new FormControl(null),
    });
  }
  getBarn(data: any) {
    let cycle = this.cycleOptions.find((item: any) => item.id == data);
    if (cycle) {
      this.lookupService
        .getBarnsByFarmId(this.farmId)
        .subscribe((data: any) => {
          this.roomOptions = data || [];
          let barnId = this.roomOptions.find(
            (item: any) => item.name == cycle.barnName
          );
          this.form.get('barnId')?.setValue(barnId);
        });
    }
  }
  getById(id: any) {
    // this.eggProductionService.getById(id).subscribe((response: any) => {
    //   this.form.patchValue({
    //     ...response,
    //     date: new Date(Date.now()),
    //     endDate: new Date(response?.endDate),
    //   });
    // });
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmId: +this.farmId });
    if (this.editMode) {
      // this.eggProductionService.setEggProudction(this.form.value).subscribe((response: any) => {
      //   this.successMesg = 'تم إضافة بيانات إنتاج البيض بنجاح، يمكنك المتابعة';
      //   this.showSuccessDialog = true;
      // });
    } else {
      this.eggProductionService.setEggProudction(this.form.value).subscribe((response: any) => {
        this.successMesg = 'تم إضافة بيانات إنتاج البيض بنجاح، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }
  backToList() {
    this.router.navigate(['/warehouse/egg-production']);
  }
}
