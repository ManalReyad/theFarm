import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'employees',
        loadChildren: () =>
          import('../employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('../departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
