import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { MedicineComponent } from './medicine/medicine.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MedicineComponent],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class MedicineModule { }
