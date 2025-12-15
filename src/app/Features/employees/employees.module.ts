import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListingComponent } from './employees-listing/employees-listing.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { EmploymentRecordComponent } from './employees-form/employment-record/employment-record.component';
import { QualificationsComponent } from './employees-form/qualifications/qualifications.component';
import { EmployeeDataComponent } from './employees-form/employee-data/employee-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './employees-listing/filter/filter.component';
import {DialogModule} from 'primeng/dialog'


@NgModule({
  declarations: [
    EmployeesListingComponent,
    EmployeesFormComponent,
    EmploymentRecordComponent,
    QualificationsComponent,
    EmployeeDataComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule

  ]
})
export class EmployeesModule { }
