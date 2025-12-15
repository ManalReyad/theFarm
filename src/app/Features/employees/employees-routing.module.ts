import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListingComponent } from './employees-listing/employees-listing.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListingComponent,
  },
  {
    path: 'create',
    component: EmployeesFormComponent,
  },
  {
    path: 'update/:id',
    component: EmployeesFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
