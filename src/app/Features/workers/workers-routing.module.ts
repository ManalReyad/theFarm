import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersListComponent } from './workers-list/workers-list.component';
import { WorkersFormComponent } from './workers-form/workers-form.component';
import { VacationsComponent } from './vacations/vacations.component';
import { AdvancesComponent } from './advances/advances.component';

const routes: Routes = [
  {
    path: '',
    component: WorkersListComponent,
  },
  {
    path: 'create',
    component: WorkersFormComponent,
  },
  {
    path: 'update/:id',
    component: WorkersFormComponent,
  },
  {
    path: 'vacations/:id',
    component: VacationsComponent,
  },
  {
    path: 'advances/:id',
    component: AdvancesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkersRoutingModule {}
