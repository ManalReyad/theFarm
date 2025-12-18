import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmRoutingModule } from './farm-routing.module';
import { FarmComponent } from './farm/farm.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    FarmComponent
  ],
  imports: [
    CommonModule,
    FarmRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class FarmModule { }
