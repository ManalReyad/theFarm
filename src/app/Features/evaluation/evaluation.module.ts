import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationItemsComponent } from './evaluation-items/evaluation-items.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EvaluationItemsComponent,
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class EvaluationModule { }
