import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailySummaryRoutingModule } from './daily-summary-routing.module';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';


@NgModule({
  declarations: [
    DailySummaryComponent
  ],
  imports: [
    CommonModule,
    DailySummaryRoutingModule
  ]
})
export class DailySummaryModule { }
