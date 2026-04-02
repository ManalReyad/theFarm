import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedConsumptionReportComponent } from './feed-consumption-report/feed-consumption-report.component';
import { EggProductionReportComponent } from './egg-production-report/egg-production-report.component';

const routes: Routes = [
  {
    path:'feed-consumption',component:FeedConsumptionReportComponent
  },
  {
    path:'egg-production',component:EggProductionReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
