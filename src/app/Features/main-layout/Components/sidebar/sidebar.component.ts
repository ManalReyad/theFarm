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
    this.sideRoutes.forEach(item => {
      item.command = () => this.onSelectItem(item);
      item.items?.forEach(child => {
        child.command = () => this.onSelectItem(child);
      });
    });
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
  onSelectItem(data:any) {
    if (this.inResponsiveMode&&!data.items) {
      this.sideNavClosed.emit();

    }
  }
}
