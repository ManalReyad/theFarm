import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SharedModule } from 'src/app/Shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    MainLayoutComponent,

  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SidebarModule,
    PanelMenuModule,
    SharedModule,
    OverlayPanelModule

  ]
})
export class MainLayoutModule { }
