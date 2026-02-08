import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RawMaterialRoutingModule } from './raw-material-routing.module';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RawMaterialComponent],
  imports: [
    CommonModule,
    RawMaterialRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class RawMaterialModule { }
