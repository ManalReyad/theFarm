import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';

const routes: Routes = [
  {
    path:'',component:DailySummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailySummaryRoutingModule { }
