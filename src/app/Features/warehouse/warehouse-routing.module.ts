import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { OutgoingStockComponent } from './outgoing-stock/outgoing-stock.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  { path: '', component: WarehouseComponent },
  // {
  //   path:'incoming',component:IncomingStockComponent,
  // },
  // {
  //   path:'outgoing',component:OutgoingStockComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
