import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradersListComponent } from './traders-list/traders-list.component';
import { TradersFormComponent } from './traders-form/traders-form.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradersRoutingModule {}
