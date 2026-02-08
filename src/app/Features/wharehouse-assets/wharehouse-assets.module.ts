import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WharehouseAssetsRoutingModule } from './wharehouse-assets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WharehouseAssetsComponent } from './wharehouse-assets/wharehouse-assets.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [WharehouseAssetsComponent],
  imports: [
    CommonModule,
    WharehouseAssetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
  ],
})
export class WharehouseAssetsModule {}
