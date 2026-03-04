import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashBoxListComponent } from './cash-box-list/cash-box-list.component';
import { CashboxReportComponent } from './cashbox-report/cashbox-report.component';

const routes: Routes = [
  {
    path: '',
    component: CashBoxListComponent,
  },
  {
    path: 'report',
    component: CashboxReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashBoxRoutingModule {}
