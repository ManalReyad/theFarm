import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { EggProductionFormComponent } from './egg-production-form/egg-production-form.component';
import { EggSalesComponent } from './egg-sales/egg-sales.component';
import { EggProductionComponent } from './egg-production/egg-production.component';
import { EggSalesFormComponent } from './egg-sales-form/egg-sales-form.component';
import { WarehouseListingComponent } from './warehouse-listing/warehouse-listing.component';
import { ChickenSalesComponent } from './chicken-sales/chicken-sales.component';
import { ChickenSalesFormComponent } from './chicken-sales-form/chicken-sales-form.component';

const routes: Routes = [
  { path: 'list', component: WarehouseListingComponent },
  { path: 'items-medicine', component: WarehouseComponent },
  {
    path: 'incoming',
    component: IncomingStockComponent,
  },
  {
    path: 'egg-sales',
    component: EggSalesComponent,
  },
  {
    path: 'egg-sales/add',
    component: EggSalesFormComponent,
  },
  {
    path: 'chicken-sales',
    component: ChickenSalesComponent,
  },
  {
    path: 'chicken-sales/add',
    component: ChickenSalesFormComponent,
  },
  {
    path: 'egg-production',
    component: EggProductionComponent,
  },
  {
    path: 'egg-production/add',
    component: EggProductionFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
