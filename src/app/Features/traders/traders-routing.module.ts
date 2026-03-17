import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersFormComponent } from './traders-form/traders-form.component';
import { LedgerComponent } from './ledger/ledger.component';

const routes: Routes = [
  {
    path: '',
    component: TradersListComponent,
  },
  {
    path: 'create',
    component: TradersFormComponent,
  },
  {
    path: 'update/:id',
    component: TradersFormComponent,
  },
   {
    path: 'invioces/:id',
    component: LedgerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradersRoutingModule {}
