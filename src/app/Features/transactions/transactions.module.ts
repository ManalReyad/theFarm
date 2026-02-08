import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
]
})
export class TransactionsModule { }
