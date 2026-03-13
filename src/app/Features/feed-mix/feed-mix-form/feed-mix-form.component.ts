import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { FeedMixService } from '../feed-mix.service';
import { ItemsService } from 'src/app/Shared/Services/items.service';

@Component({
  selector: 'app-feed-mix-form',
  templateUrl: './feed-mix-form.component.html',
  styleUrl: './feed-mix-form.component.scss',
})
export class FeedMixFormComponent {
  pages = [
    { name: 'خلطات العلف', route: '/feed-mix' },
    { name: 'تسجيل خلطة علف' },
  ];

  form!: FormGroup;
  editMode = false;

  feedTypeOptions: { id: number; name: string }[] = [];
  warehouseOptions: { id: number; name: string }[] = [];
  itemOptions: { id: number; name: string }[] = [];
  selectedItems: any[] = [];
  farmId: any;
  successMesg = '';
  showSuccessDialog = false;
  currentItemIndex = 0;
  maxResultCount: number = 7;
  skipCount: number = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private feedMixService: FeedMixService,
    private lookupService: LookupService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemsService
  ) {}

  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.getById(id);
      this.editMode = true;
      this.pages = [
        { name: 'خلطات العلف', route: '/feed-mix' },
        { name: 'تعديل خلطة علف' },
      ];
    }

    this.loadDropdowns();
    this.createForm();
  }

  loadDropdowns() {
    this.lookupService.getFeedTypes().subscribe((res: any) => {
      this.feedTypeOptions = res.feedTypes || [];
    });
    this.lookupService
      .getWarehouseByFarmId(this.farmId)
      .subscribe((res: any) => {
              this.warehouseOptions =res? [{...res}]:[];

      });
    //need lookup
    this.itemService
      .getItems(100, this.skipCount, 1)
      .subscribe((res: any) => {
        this.itemOptions =
          res.items.map((item: any) => {
            return { name: item.name, id: item.id };
          }) || [];
      });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      feedTypeId: new FormControl(null, Validators.required),
      warehouseId: new FormControl(null, Validators.required),
      items: this.fb.array([
        this.fb.group({
          id: [0],
          itemId: [],
          quantity: [],
        }),
      ]),
    });
  }
  createItemGroup(): FormGroup {
    return this.fb.group({
      id: [0],
      itemId: [null],
      quantity: [null],
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  getById(id: any) {
    // this.feedMixService.getById(id).subscribe((res: any) => {
    //   this.form.patchValue(res);
    //   this.selectedItems = res.items.map((i: any) => i.itemId);
    // });
  }

  getAvailableItems(index: number) {
    const selectedBeforeCurrent = this.selectedItems.filter(
      (_, i) => i !== index
    );
    return this.itemOptions.filter(
      (item) => !selectedBeforeCurrent.includes(item.id)
    );
  }

  onSelectionChange(id: any, index: number) {
    this.selectedItems[index] = id;
  }

  addRow() {
    this.items.push(this.createItemGroup());
    this.currentItemIndex++;
  }

  deleteRow(index: number) {
    this.items.removeAt(index);
    this.selectedItems.splice(index, 1);
    this.currentItemIndex = this.items.length - 1;
  }

  isCurrentRowInvalid(): boolean {
    const row = this.items.at(this.currentItemIndex);
    if (!row) return false;
    const itemId = row.get('itemId')?.value;
    const quantity = row.get('quantity')?.value;
    return !itemId || quantity === null || quantity === undefined;
  }

  save() {
    const formValue = this.form.value;
    formValue.items = formValue.items.map((item: any) => ({
      ...item,
      quantity: item.quantity !== null ? +item.quantity : null,
    }));
    if (this.editMode) {
      // this.feedMixService.update(this.form.value).subscribe(() => {
      //   this.successMesg = 'تم تعديل خلطة العلف بنجاح';
      //   this.showSuccessDialog = true;
      // });
    } else {
      this.feedMixService.create(this.form.value).subscribe(() => {
        this.successMesg = 'تمت إضافة خلطة العلف بنجاح';
        this.showSuccessDialog = true;
      });
    }
  }

  restrictNegative(event: KeyboardEvent) {
    if (['-', '+', 'ArrowUp', 'ArrowDown'].includes(event.key))
      event.preventDefault();
  }

  backToList() {
    this.router.navigate(['/feed-mix']);
  }
}
