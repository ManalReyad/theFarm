import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FarmService } from '../../farm/farm.service';
import { RoomService } from '../../room/room.service';
import { WarehouseService } from '../warehouse.service';

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
  constructor(
    private farmService: FarmService,
    private roomService: RoomService,
    private warehouseService: WarehouseService,
  ) {}
  ngOnInit(): void {
    this.getDropdowns();
    this.createForm();
  }
  getDropdowns() {
    this.roomService.getList().subscribe((response: any) => {
      if (response.success) {
        this.roomOptions = response.data;
      }
    });
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
      // inventoryTypeID: new FormControl(null, Validators.required),
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
}
