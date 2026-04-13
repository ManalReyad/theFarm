import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersFormComponent } from './workers-form/workers-form.component';
import { WorkersListComponent } from './workers-list/workers-list.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AdvancesComponent } from './advances/advances.component';
import { VacationsComponent } from './vacations/vacations.component';
import { DialogModule } from "primeng/dialog";
import { BonusComponent } from './bonus/bonus.component';


@NgModule({
  declarations: [WorkersFormComponent,WorkersListComponent, AdvancesComponent, VacationsComponent, BonusComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule
]
})
export class WorkersModule { }
