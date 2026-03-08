import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CycleService } from '../../cycle/cycle.service';
import { DailyRegistrationService } from '../daily-registration.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { WarehouseService } from '../../warehouse/warehouse.service';

@Component({
  selector: 'app-daily-registration-form',
  templateUrl: './daily-registration-form.component.html',
  styleUrl: './daily-registration-form.component.scss',
})
export class DailyRegistrationFormComponent {
  pages: any = [
    { name: 'التسجيلات اليومية', route: '/cycle' },
    { name: 'إضافة تسجيل يومي' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  barnsOptions: { id: number; name: string }[] = [];
  cycleOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  farmOptions: { id: number; name: string }[] = [];
  selectedfeedConsumptions: any[] = [];
  selectedmedicineConsumptions: any[] = [];
  currentFeedItemIndex: number = 0;
  currentMedicineItemIndex: number = 0;
  allFeedItemTypes: { id: number; name: string }[] = [];
  allMedicineItemTypes: { id: number; name: string }[] = [];
  warehouseOptions: { id: number; name: string }[] = [];
  currentFeedItemRowInvalid: boolean = false;
  currentMedicineRowInvalid: boolean = false;
  farmId: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private dailyRegisterService: DailyRegistrationService,
    private fb: FormBuilder,
    private lookupService: LookupService,
    private warehouseService:WarehouseService
  ) {}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.getById(id);
      this.editMode = true;
      this.pages = [
        { name: 'التسجيلات اليومية', route: '/daily-registration' },
        { name: 'تعديل تسجيل يومي' },
      ];
    }
    // this.farmId = Number(localStorage.getItem('farmId'));
    // if (this.farmId) {
    //   this.lookupService
    //     .getBarnsByFarmId(this.farmId)
    //     .subscribe((data: any) => {
    //       this.barnsOptions = data || [];
    //     });
    // }
    this.getDropdowns();
    this.createForm();
  }
  getDropdowns() {
    this.lookupService.getFeedMixes().subscribe((response: any) => {
      this.allFeedItemTypes = response;
    });
    this.lookupService.getMedicines().subscribe((response: any) => {
      this.allMedicineItemTypes = response;
    });
    this.lookupService.getUpcomingCycles(this.farmId).subscribe((response: any) => {
      this.cycleOptions = response;
    });
    //dropdown-needed
    this.warehouseService.getAll().subscribe((res: any) => {
      this.warehouseOptions =
        res.map((item: any) => {
          return { name: item.name, id: item.id };
        }) || [];
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      deadCount: new FormControl(null, Validators.required),
      cycleId: new FormControl(null, Validators.required),
      warehouseId:new FormControl(null, Validators.required),
      feedConsumptions: this.fb.array([
        this.fb.group({
          itemId: [],
          quantity: [],
        }),
      ]),
      medicineConsumptions: this.fb.array([
        this.fb.group({
          itemId: [],
          quantity: [],
        }),
      ]),
    });
  }
  getById(id: any) {
    // this.dailyRegisterService.getById(id).subscribe((response: any) => {
    //   this.form.patchValue({
    //     ...response,
    //     date: new Date(response.date),
    //   });
    // });
  }
  get feedConsumptions() {
    return this.form.get('feedConsumptions') as FormArray;
  }
  get medicineConsumptions() {
    return this.form.get('medicineConsumptions') as FormArray;
  }
  getAvailablemedicineConsumptions(index: number): any[] {
    const selectedBeforeCurrent = this.selectedmedicineConsumptions.filter(
      (_, i) => i !== index
    );
    return this.allMedicineItemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id)
    );
  }
  getAvailablefeedConsumptions(index: number): any[] {
    const selectedBeforeCurrent = this.selectedfeedConsumptions.filter(
      (_, i) => i !== index
    );
    return this.allFeedItemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id)
    );
  }
  onSelectionChange(id: any, index: number, type: string): void {
    if (type === 'feed') {
      this.selectedfeedConsumptions[index] = id;
    } else {
      this.selectedmedicineConsumptions[index] = id;
    }
  }

  addRow(type: string) {
    if (type === 'feed') {
      this.feedConsumptions.push(
        this.fb.group({
          itemId: [null],
          quantity: [null],
        })
      );
      this.selectedfeedConsumptions.push(null);
      this.currentFeedItemIndex = this.feedConsumptions.length - 1;
    } else {
      this.medicineConsumptions.push(
        this.fb.group({
          itemId: [null],
          quantity: [null],
        })
      );
      this.selectedmedicineConsumptions.push(null);
      this.currentMedicineItemIndex = this.medicineConsumptions.length - 1;
    }
  }

  deleteRow(rowIndex: number, type: string) {
    if (type === 'feed') {
      this.feedConsumptions.removeAt(rowIndex);
      this.selectedfeedConsumptions.splice(rowIndex, 1);
      this.currentFeedItemIndex = this.feedConsumptions.length - 1;
    } else {
      this.medicineConsumptions.removeAt(rowIndex);
      this.selectedmedicineConsumptions.splice(rowIndex, 1);
      this.currentMedicineItemIndex = this.medicineConsumptions.length - 1;
    }
  }

  isCurrentFeedItemRowInvalid(): boolean {
    const rowForm = this.feedConsumptions.at(this.currentFeedItemIndex);
    if (rowForm) {
      const itemId = rowForm.get('itemId')?.value;
      const quantity = rowForm.get('quantity')?.value;
      return (this.currentFeedItemRowInvalid =
        !itemId || quantity === null || quantity === undefined);
    }
    return false;
  }
  isCurrentMedicineItemRowInvalid(): boolean {
    const rowForm = this.medicineConsumptions.at(this.currentMedicineItemIndex);
    if (rowForm) {
      const itemId = rowForm.get('itemId')?.value;
      const quantity = rowForm.get('quantity')?.value;

      return (this.currentMedicineRowInvalid =
        !itemId || quantity === null || quantity === undefined);
    }
    return false;
  }
  save() {
    const payload = {
      ...this.form.value,
      deadCount: Number(this.form.value.deadCount),
      feedConsumptions: this.form.value.feedConsumptions.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity),
        itemId: Number(item.itemId)
      })),
      medicineConsumptions: this.form.value.medicineConsumptions.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity),
        itemId: Number(item.itemId)
      }))
    };
  
    if (this.editMode) {
      // update
    } else {
      this.dailyRegisterService.create(payload).subscribe(() => {
        this.successMesg = 'تمت إضافة التسجيل اليومي بنجاح ، يمكنك المتابعة';
        this.showSuccessDialog = true;
      });
    }
  }
  
  restrictNagtive(event: KeyboardEvent) {
    if (
      event.key === '-' ||
      event.key === '+' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }
  backToList() {
    this.router.navigate(['/daily-registration']);
  }
}
