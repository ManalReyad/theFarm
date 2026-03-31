import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedConsumptionReportComponent } from './feed-consumption-report/feed-consumption-report.component';

const routes: Routes = [
  {
    path:'feed-consumption',component:FeedConsumptionReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
