import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationItemsComponent } from './evaluation-items/evaluation-items.component';

const routes: Routes = [
  {
    path:'',component:EvaluationItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
