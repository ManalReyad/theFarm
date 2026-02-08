import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedMixRoutingModule } from './feed-mix-routing.module';
import { FeedMixComponent } from './feed-mix/feed-mix.component';
import { FeedMixFormComponent } from './feed-mix-form/feed-mix-form.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [
    FeedMixComponent,
    FeedMixFormComponent
  ],
  imports: [
    CommonModule,
    FeedMixRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule
]
})
export class FeedMixModule { }
