import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets/assets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class AssetsModule { }
