import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientInvoicesComponent } from './client-invoices/client-invoices.component';
import { SharedModule } from "src/app/Shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from "primeng/dialog";


@NgModule({
  declarations: [
    ClientsListComponent,
    ClientsFormComponent,
    ClientInvoicesComponent,

  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogModule
]
})
export class ClientsModule { }
