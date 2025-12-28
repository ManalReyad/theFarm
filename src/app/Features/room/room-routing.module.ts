import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListingComponent } from './room-listing/room-listing.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { RoomAssetsComponent } from './room-assets/room-assets.component';

const routes: Routes = [
  { path: '', component: RoomListingComponent },
  { path: 'create', component: RoomFormComponent },
  { path: 'update/:id', component: RoomFormComponent },
  { path: 'room-assets/:id', component: RoomAssetsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
