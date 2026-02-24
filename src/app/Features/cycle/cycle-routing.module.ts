import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CycleListingComponent } from './cycle-listing/cycle-listing.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { CycleEvaluationFormComponent } from './cycle-evaluation-form/cycle-evaluation-form.component';
import { CycleEvaluationComponent } from './cycle-evaluation/cycle-evaluation.component';

const routes: Routes = [
  { path: '', component: CycleListingComponent },
  { path: 'create', component: CycleFormComponent },
  { path: 'update/:id', component: CycleFormComponent },
  { path: 'evaluation/create/:id', component: CycleEvaluationFormComponent },
  { path: 'evaluations/:id', component: CycleEvaluationComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CycleRoutingModule { }
