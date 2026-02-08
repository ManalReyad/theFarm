import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { FarmService } from '../../farm/farm.service';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrl: './incoming-stock.component.scss',
})
export class IncomingStockComponent {
  pages = [{ name: 'المخزن' }];
  form!: FormGroup;
  editMode: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  farmOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  itemTypes: any[] = [];
  selectedItems: any[] = [];
  currentItemIndex: number = 0;
  currentItemRowInvalid: boolean = false;
  constructor(
    private lookupService: LookupService,
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getDropdowns();
    this.createForm();
  }

  getDropdowns() {
    this.lookupService.getStoreItems().subscribe((response: any) => {
      this.itemTypes = response;
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      warehouseId: new FormControl(null, Validators.required),
      traderId: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      Items: this.fb.array([
        this.fb.group({
          id: [0],
          quantity: [],
          itemId: [],
          pricePerTon: [],
        }),
      ]),
    });
  }
  get Items() {
    return this.form.get('Items') as FormArray;
  }
  getAvailableItems(index: number): any[] {
    const selectedBeforeCurrent = this.selectedItems.filter(
      (_, i) => i !== index,
    );
    return this.itemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id),
    );
  }
  onSelectionChange(event: any, index: number): void {
    const selectedValue = event.value;
    this.selectedItems[index] = selectedValue;
  }

  addRow() {
    this.Items.push(
      this.fb.group({
        id: [0],
        itemId: [],
        quantity: [],
        pricePerTon: [],
      }),
    );
    this.currentItemIndex++;
  }
  deleteRow(rowId: number): void {
    this.Items.removeAt(rowId);
    this.currentItemIndex--;
  }

  isCurrentFeedItemRowInvalid(): boolean {
    const rowForm = this.Items.at(this.currentItemIndex);
    if (rowForm) {
      const itemId = rowForm.get('itemId')?.value;
      const pricePerTon = rowForm.get('pricePerTon')?.value;
      const quantity = rowForm.get('quantity')?.value;

      return (this.currentItemRowInvalid =
        !itemId ||
        quantity === null ||
        quantity === undefined ||
        pricePerTon === null ||
        pricePerTon === undefined);
    }
    return false;
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
  save() {
    this.warehouseService
      .createTransaction(this.form.value)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تمت العملية بنجاح ، يمكنك المتابعة';
          this.showSuccessDialog = true;
        }
      });
  }
  backToList() {
    this.router.navigate(['warehouse']);
  }
}
