import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomService } from '../../room/room.service';
import { FarmService } from '../../farm/farm.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrl: './incoming-stock.component.scss'
})
export class IncomingStockComponent {
pages = [
    { name: 'المخزن', },
    { name: 'الموارد الواردة' },
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
}
