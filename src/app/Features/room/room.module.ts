import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListingComponent } from './room-listing/room-listing.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RoomFormComponent } from './room-form/room-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomAssetsComponent } from './room-assets/room-assets.component';
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [RoomListingComponent, RoomFormComponent,RoomAssetsComponent],
  imports: [CommonModule, RoomRoutingModule, SharedModule, ReactiveFormsModule, DialogModule],
})
export class RoomModule {}
