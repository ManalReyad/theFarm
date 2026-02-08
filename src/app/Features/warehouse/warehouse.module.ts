import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { TableModule } from "primeng/table";
import { EggProductionComponent } from './egg-production/egg-production.component';
import { EggProductionFormComponent } from './egg-production-form/egg-production-form.component';
import { EggSalesFormComponent } from './egg-sales-form/egg-sales-form.component';
import { EggSalesComponent } from './egg-sales/egg-sales.component';

@NgModule({
  declarations: [
    IncomingStockComponent,
    WarehouseComponent,
    WarehouseDetailsComponent,
    EggProductionComponent,
    EggProductionFormComponent,
    EggSalesFormComponent,
    EggSalesComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule
],
})
export class WarehouseModule {}
