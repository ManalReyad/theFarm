import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../Services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  @Output() sideNavClosed = new EventEmitter();
  sideRoutes:MenuItem[]=[]
  constructor( private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.initializeMenus();
        this.sideRoutes = this.menuService.menus;
  }

  onCloseSidebar() {
    this.sideNavClosed.emit();
  }
}
