import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  sideRoutes: MenuItem[] = [];
  inResponsiveMode: boolean = false;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.initializeMenus();
    this.sideRoutes = this.menuService.menus;
     this.sideRoutes.forEach((item:MenuItem)=>item.command=()=>this.onSelectItem())
    this.onResize();
  }

  onCloseSidebar() {
    this.sideNavClosed.emit();
  }
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth <= 1024) {
      this.inResponsiveMode = true;
    } else {
      this.inResponsiveMode = false;
    }
  }
  onSelectItem() {
    if (this.inResponsiveMode) {
      this.sideNavClosed.emit();

    }
  }
}
