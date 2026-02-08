import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedMixComponent } from './feed-mix/feed-mix.component';
import { FeedMixFormComponent } from './feed-mix-form/feed-mix-form.component';

const routes: Routes = [
  {
    path: '',
    component: FeedMixComponent,
  },
  {
    path: 'create',
    component: FeedMixFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedMixRoutingModule {}
