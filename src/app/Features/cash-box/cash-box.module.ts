import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashBoxRoutingModule } from './cash-box-routing.module';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import { CashboxReportComponent } from './cashbox-report/cashbox-report.component';



@NgModule({
  declarations: [
    CashBoxListComponent,
    CashboxReportComponent,
  ],
  imports: [
    CommonModule,
    CashBoxRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class CashBoxModule { }
