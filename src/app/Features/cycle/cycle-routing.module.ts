import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CycleListingComponent } from './cycle-listing/cycle-listing.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';

const routes: Routes = [
  { path: '', component: CycleListingComponent },
  { path: 'create', component: CycleFormComponent },
  { path: 'update/:id', component: CycleFormComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CycleRoutingModule { }
