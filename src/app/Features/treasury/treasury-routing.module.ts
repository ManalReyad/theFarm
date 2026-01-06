import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreasuryComponent } from './treasury/treasury.component';
import { TreasuryDeductionComponent } from './treasury-deduction/treasury-deduction.component';

const routes: Routes = [
  {
    path: '',
    component: TreasuryComponent,
  },
  {
    path: 'deduction',
    component: TreasuryDeductionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreasuryRoutingModule {}
