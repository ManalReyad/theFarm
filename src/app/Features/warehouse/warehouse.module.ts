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
import { WarehouseListingComponent } from './warehouse-listing/warehouse-listing.component';
import { DialogModule } from "primeng/dialog";
import { ChickenSalesComponent } from './chicken-sales/chicken-sales.component';
import { ChickenSalesFormComponent } from './chicken-sales-form/chicken-sales-form.component';
import { EggStockComponent } from './egg-stock/egg-stock.component';

@NgModule({
  declarations: [
    IncomingStockComponent,
    WarehouseComponent,
    WarehouseDetailsComponent,
    EggProductionComponent,
    EggProductionFormComponent,
    EggSalesFormComponent,
    EggSalesComponent,
    WarehouseListingComponent,
    ChickenSalesComponent,
    ChickenSalesFormComponent,
    EggStockComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule
],
})
export class WarehouseModule {}
