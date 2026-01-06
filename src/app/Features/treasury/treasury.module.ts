import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreasuryRoutingModule } from './treasury-routing.module';
import { TreasuryComponent } from './treasury/treasury.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import { TreasuryDeductionComponent } from './treasury-deduction/treasury-deduction.component';


@NgModule({
  declarations: [TreasuryComponent,TreasuryDeductionComponent],
  imports: [
    CommonModule,
    TreasuryRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class TreasuryModule { }
