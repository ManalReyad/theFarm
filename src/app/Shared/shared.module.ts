import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ListComponent } from './Components/list/list.component';
import { InputComponent } from './Components/input/input.component';
import { DropdownComponent } from './Components/dropdown/dropdown.component';
import { DateInputComponent } from './Components/date-input/date-input.component';
import { SearchComponent } from './Components/search/search.component';
import { BreadCrumbComponent } from './Components/bread-crumb/bread-crumb.component';
import { HideColumnPipe } from './Pipes/hide-column.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SuccessDialogComponent } from './Components/success-dialog/success-dialog.component';
import { FailedDialogComponent } from './Components/failed-dialog/failed-dialog.component';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationDeleteDialogComponent } from './Components/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { CollapsComponent } from './Components/collaps/collaps.component';
import { MultiSelectDropdownComponent } from './Components/multi-select-dropdown/multi-select-dropdown.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordInputComponent } from './Components/password-input/password-input.component';
import { NoDataComponent } from './Components/no-data/no-data.component';
import { OverlayPanelModule } from "primeng/overlaypanel";

@NgModule({
  declarations: [
    ListComponent,
    InputComponent,
    DropdownComponent,
    DateInputComponent,
    SearchComponent,
    BreadCrumbComponent,
    HideColumnPipe,
    SuccessDialogComponent,
    FailedDialogComponent,
    ConfirmationDialogComponent,
    ConfirmationDeleteDialogComponent,
    CollapsComponent,
    MultiSelectDropdownComponent,
    PasswordInputComponent,
    NoDataComponent,
  ],
  exports: [
    ListComponent,
    InputComponent,
    DropdownComponent,
    DateInputComponent,
    SearchComponent,
    BreadCrumbComponent,
    SuccessDialogComponent,
    FailedDialogComponent,
    ConfirmationDialogComponent,
    ConfirmationDeleteDialogComponent,
    CollapsComponent,
    MultiSelectDropdownComponent,
    PasswordInputComponent,
    NoDataComponent

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
    PaginatorModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    MultiSelectModule,
    OverlayPanelModule
],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
