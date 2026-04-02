import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { FeedConsumptionReportComponent } from './feed-consumption-report/feed-consumption-report.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { EggProductionReportComponent } from './egg-production-report/egg-production-report.component';


@NgModule({
  declarations: [
    FeedConsumptionReportComponent,
    EggProductionReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class ReportsModule { }
