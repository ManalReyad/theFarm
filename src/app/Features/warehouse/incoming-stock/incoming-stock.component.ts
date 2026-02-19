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
import { TradersService } from '../../traders/traders.service';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrl: './incoming-stock.component.scss',
})
export class IncomingStockComponent {
  pages = [
    { name: 'المخزن', route: 'warehouse/items-medicine' },
    { name: 'توريد أصناف وأدوية' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  traderOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  itemTypes: any[] = [];
  selectedItems: any[] = [];
  currentItemIndex: number = 0;
  currentItemRowInvalid: boolean = false;
  warehouseOptions: { id: number; name: string }[] = [];

  constructor(
    private lookupService: LookupService,
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private router: Router,
    private tradersService: TradersService
  ) {}
  ngOnInit(): void {
    this.getDropdowns();
    this.createForm();
  }

  getDropdowns() {
    this.lookupService.getStoreItems().subscribe((response: any) => {
      this.itemTypes = response;
    });
    this.lookupService.getSuppliers().subscribe((response: any) => {
      this.traderOptions = response?.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    });
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
      warehouseId: new FormControl(null, Validators.required),
      traderId: new FormControl(null, Validators.required),
      date: new FormControl(new Date(Date.now()), Validators.required),
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
      (_, i) => i !== index
    );
    return this.itemTypes.filter(
      (itemType) => !selectedBeforeCurrent.includes(itemType.id)
    );
  }
  onSelectionChange(id: any, index: number): void {
    this.selectedItems[index] = id;
  }

  addRow() {
    this.Items.push(
      this.fb.group({
        id: [0],
        itemId: [],
        quantity: [],
        pricePerTon: [],
      })
    );
    this.currentItemIndex++;
  }
  deleteRow(rowId: number): void {
    this.Items.removeAt(rowId);
    this.selectedItems.splice(rowId, 1);
    this.currentItemIndex = this.Items.length > 0 ? this.Items.length - 1 : 0;
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
        this.successMesg = 'تم تسجيل التوريد وتحديث المخزن بنجاح';
        this.showSuccessDialog = true;
      });
  }
  backToList() {
    this.router.navigate(['warehouse/items-medicine']);
  }
}
