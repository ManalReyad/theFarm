import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { FeedConsumptionReportComponent } from './feed-consumption-report/feed-consumption-report.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeedConsumptionReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class ReportsModule { }
