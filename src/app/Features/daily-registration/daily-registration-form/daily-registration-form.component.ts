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
import { RoomService } from '../../room/room.service';
import { FarmService } from '../../farm/farm.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

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
  selectedFeedItems: any[] = [];
  selectedMedicineItems: any[] = [];
  currentFeedItemIndex: number = 0;
  currentMedicineItemIndex: number = 0;
  allFeedItemTypes: { id: number; name: string }[] = [];
  allMedicineItemTypes: { id: number; name: string }[] = [];
  currentFeedItemRowInvalid: boolean = false;
  currentMedicineRowInvalid: boolean = false;
  farmId: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleService: CycleService,
    private roomService: RoomService,
    private dailyRegisterService: DailyRegistrationService,
    private fb: FormBuilder,
    private lookupService: LookupService,
  ) {}
  ngOnInit(): void {
    let cycleId = this.activatedRoute.snapshot.params['id'];
    if (cycleId) {
      this.getById(cycleId);
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
      this.allFeedItemTypes = response.data;
    });
    this.lookupService.getMedicines().subscribe((response: any) => {
      this.allMedicineItemTypes = response.data;
    });
  }
  getRooms(id: any) {
    this.cycleService.getList(id).subscribe((response: any) => {
      if (response.success) {
        this.cycleOptions = response.data;
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      deadChicken: new FormControl(null, Validators.required),
      cycleId: new FormControl(null, Validators.required),
      feedItems: this.fb.array([
        this.fb.group({
          id: [0],
          itemTypeId: [],
          quantity: [],
        }),
      ]),
      medicineItems: this.fb.array([
        this.fb.group({
          id: [0],
          itemTypeId: [],
          quantity: [],
        }),
      ]),
    });
  }
  getById(id: any) {
    this.dailyRegisterService.getById(id).subscribe((response: any) => {
      if (response.success) {
        this.form.patchValue({
          ...response.data,
          date: new Date(response.data.date),
        });
      }
    });
  }
  get feedItems() {
    return this.form.get('feedItems') as FormArray;
  }
  get medicineItems() {
    return this.form.get('medicineItems') as FormArray;
  }
  getAvailableMedicineItems(index: number): any[] {
    const selectedBeforeCurrent = this.selectedMedicineItems.filter(
      (_, i) => i !== index,
    );
    return this.allMedicineItemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id),
    );
  }
  getAvailableFeedItems(index: number): any[] {
    const selectedBeforeCurrent = this.selectedFeedItems.filter(
      (_, i) => i !== index,
    );
    return this.allFeedItemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id),
    );
  }
  onSelectionChange(event: any, index: number, type: string): void {
    const selectedValue = event.value;
    if (type == 'feed') {
      this.selectedFeedItems[index] = selectedValue;
    } else {
      this.selectedMedicineItems[index] = selectedValue;
    }
  }

  addRow(type: string) {
    if (type == 'feed') {
      this.feedItems.push(
        this.fb.group({
          id: [0],
          itemTypeId: [],
          quantity: [],
        }),
      );
      this.currentFeedItemIndex++;
    } else {
      this.medicineItems.push(
        this.fb.group({
          id: [0],
          itemTypeId: [],
          quantity: [],
        }),
      );
      this.currentMedicineItemIndex++;
    }
  }
  deleteRow(rowId: number, type: string): void {
    if (type === 'feed') {
      this.feedItems.removeAt(rowId);
      this.currentFeedItemIndex--;
    } else {
      this.medicineItems.removeAt(rowId);
      this.currentMedicineItemIndex--;
    }
  }

  isCurrentFeedItemRowInvalid(): boolean {
    const rowForm = this.feedItems.at(this.currentFeedItemIndex);
    if (rowForm) {
      const itemTypeId = rowForm.get('itemTypeId')?.value;
      const quantity = rowForm.get('quantity')?.value;
      return (this.currentFeedItemRowInvalid =
        !itemTypeId || quantity === null || quantity === undefined);
    }
    return false;
  }
  isCurrentMedicineItemRowInvalid(): boolean {
    const rowForm = this.medicineItems.at(this.currentMedicineItemIndex);
    if (rowForm) {
      const itemTypeId = rowForm.get('itemTypeId')?.value;
      const quantity = rowForm.get('quantity')?.value;

      return (this.currentMedicineRowInvalid =
        !itemTypeId || quantity === null || quantity === undefined);
    }
    return false;
  }
  save() {
    if (this.editMode) {
      this.dailyRegisterService
        .update(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تم تعديل بيانات التسجيل اليومي بنجاح، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
        });
    } else {
      this.dailyRegisterService
        .create(this.form.value)
        .subscribe((response: any) => {
          if (response.success) {
            this.successMesg =
              'تمت إضافة التسجيل اليومي بنجاح ، يمكنك المتابعة';
            this.showSuccessDialog = true;
          }
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
