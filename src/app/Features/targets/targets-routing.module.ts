import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortalityTargetComponent } from './mortality-target/mortality-target.component';
import { MortalityTargetFormComponent } from './mortality-target/mortality-target-form/mortality-target-form.component';
import { FeedConsumptionComponent } from './feed-consumption/feed-consumption.component';
import { FeedConsumptionFormComponent } from './feed-consumption/feed-consumption-form/feed-consumption-form.component';

const routes: Routes = [
  {
    path:'mortality',component:MortalityTargetComponent
  },
  {
    path:'mortality/create',component:MortalityTargetFormComponent
  },
  {
    path:'feed',component:FeedConsumptionComponent
  },
  {
    path:'feed/create',component:FeedConsumptionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
