import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CycleRoutingModule } from './cycle-routing.module';
import { CycleListingComponent } from './cycle-listing/cycle-listing.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CycleListingComponent,CycleFormComponent],
  imports: [
    CommonModule,
    CycleRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class CycleModule { }
