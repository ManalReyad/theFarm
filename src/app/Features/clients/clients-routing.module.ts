import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientInvoicesComponent } from './client-invoices/client-invoices.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
  },
  {
    path: 'create',
    component: ClientsFormComponent,
  },
  {
    path: 'update/:id',
    component: ClientsFormComponent,
  },
   {
    path: 'invioces/:id',
    component: ClientInvoicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
