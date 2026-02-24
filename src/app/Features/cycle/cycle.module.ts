import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CycleRoutingModule } from './cycle-routing.module';
import { CycleListingComponent } from './cycle-listing/cycle-listing.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { CycleEvaluationFormComponent } from './cycle-evaluation-form/cycle-evaluation-form.component';
import { CycleEvaluationComponent } from './cycle-evaluation/cycle-evaluation.component';
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [CycleListingComponent,CycleFormComponent, CycleEvaluationFormComponent, CycleEvaluationComponent],
  imports: [
    CommonModule,
    CycleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule
]
})
export class CycleModule { }
