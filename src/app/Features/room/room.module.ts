import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListingComponent } from './room-listing/room-listing.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RoomFormComponent } from './room-form/room-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomListingComponent, RoomFormComponent],
  imports: [CommonModule, RoomRoutingModule, SharedModule,ReactiveFormsModule],
})
export class RoomModule {}
