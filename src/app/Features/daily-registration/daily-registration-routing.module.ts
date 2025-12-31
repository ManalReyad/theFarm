import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyRegistrationListingComponent } from './daily-registration-listing/daily-registration-listing.component';
import { DailyRegistrationFormComponent } from './daily-registration-form/daily-registration-form.component';

const routes: Routes = [
  { path: '', component: DailyRegistrationListingComponent },
  { path: 'create', component: DailyRegistrationFormComponent },
  { path: 'update/:id', component: DailyRegistrationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyRegistrationRoutingModule { }
