import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FarmService } from '../../farm/farm.service';
import { RoomService } from '../../room/room.service';
import { WarehouseService } from '../warehouse.service';
import { InventoryType } from '../enums/inventory-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outgoing-stock',
  templateUrl: './outgoing-stock.component.html',
  styleUrl: './outgoing-stock.component.scss'
})
export class OutgoingStockComponent {
  pages = [
    { name: 'المخزن', },
    { name: 'الموارد الصادرة' },
  ];
  form!: FormGroup;
  editMode: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  farmOptions: { id: number; name: string }[] = [];
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  inventoryTypeOptions: { id: number; name: string }[] = [
    {
      id: InventoryType.Egg,
      name: 'بيض',
    },
    {
      id: InventoryType.Egg,
      name: 'علف',
    },
    {
      id: InventoryType.Egg,
      name: 'أدوية',
    },
  ];
  constructor(
    private farmService: FarmService,
    private roomService: RoomService,
    private warehouseService: WarehouseService,
    private router: Router

  ) {}
  ngOnInit(): void {
    this.getDropdowns();
    this.createForm();
  }
  getRooms(id: any) {
    this.roomService.getList(id).subscribe((response: any) => {
      if (response.success) {
        this.roomOptions = response.data;
      }
    });
  }
  getDropdowns() {
    this.farmService.getList().subscribe((response: any) => {
      if (response.success) {
        this.farmOptions = response.data;
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      quantity: new FormControl(null, Validators.required),
      inventoryTypeID: new FormControl(null, Validators.required),
      farmID: new FormControl(null, Validators.required),
      roomID: new FormControl(null, Validators.required),
    });
  }
  save() {
    this.warehouseService.createIncomingStock(this.form.value).subscribe((response: any) => {
      if (response.success) {
        this.successMesg = 'تمت الإضافة بنجاح ، يمكنك المتابعة';
        this.showSuccessDialog = true;
      }
    });
  }
  backToList() {
    this.router.navigate(['warehouse']);
  }
}
