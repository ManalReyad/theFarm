import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradersRoutingModule } from './traders-routing.module';
import { TradersFormComponent } from './traders-form/traders-form.component';
import { TradersListComponent } from './traders-list/traders-list.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { LedgerComponent } from './ledger/ledger.component';
import { DialogModule } from "primeng/dialog";


@NgModule({
  declarations: [TradersListComponent,TradersFormComponent, LedgerComponent],
  imports: [
    CommonModule,
    TradersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule
]
})
export class TradersModule { }
