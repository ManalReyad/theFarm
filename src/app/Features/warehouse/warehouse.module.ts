import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { OutgoingStockComponent } from './outgoing-stock/outgoing-stock.component';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';


@NgModule({
  declarations: [OutgoingStockComponent,IncomingStockComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
