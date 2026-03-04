import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailySummaryRoutingModule } from './daily-summary-routing.module';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DailySummaryComponent
  ],
  imports: [
    CommonModule,
    DailySummaryRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class DailySummaryModule { }
