import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { OutgoingStockComponent } from './outgoing-stock/outgoing-stock.component';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';

@NgModule({
  declarations: [
    OutgoingStockComponent,
    IncomingStockComponent,
    WarehouseComponent,
    WarehouseDetailsComponent,
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class WarehouseModule {}
