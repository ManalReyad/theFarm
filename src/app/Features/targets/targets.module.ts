import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetsRoutingModule } from './targets-routing.module';
import { MortalityTargetComponent } from './mortality-target/mortality-target.component';
import { MortalityTargetFormComponent } from './mortality-target/mortality-target-form/mortality-target-form.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from "primeng/table";
import { FeedConsumptionComponent } from './feed-consumption/feed-consumption.component';
import { FeedConsumptionFormComponent } from './feed-consumption/feed-consumption-form/feed-consumption-form.component';
import { EggProductionComponent } from './egg-production/egg-production.component';
import { EggProductionFormComponent } from './egg-production/egg-production-form/egg-production-form.component';


@NgModule({
  declarations: [
    MortalityTargetComponent,
    MortalityTargetFormComponent,
    FeedConsumptionComponent,
    FeedConsumptionFormComponent,
    EggProductionComponent,
    EggProductionFormComponent
  ],
  imports: [
    CommonModule,
    TargetsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule
]
})
export class TargetsModule { }
