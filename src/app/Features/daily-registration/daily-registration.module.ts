import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyRegistrationRoutingModule } from './daily-registration-routing.module';
import { DailyRegistrationListingComponent } from './daily-registration-listing/daily-registration-listing.component';
import { DailyRegistrationFormComponent } from './daily-registration-form/daily-registration-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DailyRegistrationListingComponent,DailyRegistrationFormComponent],
  imports: [
    CommonModule,
    DailyRegistrationRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class DailyRegistrationModule { }
