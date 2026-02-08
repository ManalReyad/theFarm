import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WharehouseAssetsComponent } from './wharehouse-assets/wharehouse-assets.component';

const routes: Routes = [{
  path:'',component:WharehouseAssetsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehouseAssetsRoutingModule { }
