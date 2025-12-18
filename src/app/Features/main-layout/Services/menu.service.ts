import { Injectable } from '@angular/core';
import { MenuItem ,PrimeIcons} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menus: MenuItem[]=[];
  constructor() { }


  initializeMenus() {
    this.menus = [
      {
        label: 'المزرعة',
        visible:true,
        icon: PrimeIcons.BUILDING_COLUMNS,
        iconStyle:{fontSize:'1.5rem'},
        routerLink: ['farm'],
      },

      {
        label: 'العنابر',
        visible:true,
        icon: PrimeIcons.SHOP,
        iconStyle:{fontSize:'1.5rem'},
        routerLink: ['/departments'],
      },
    ]
  }
  getFirstVisibleRoute(): string {
    let menu = this.getFirstVisibleMenu(this.menus);

    if (menu != undefined && menu != null) {
      return menu.routerLink[0];
    } 
    return '/dashboard';
  }

  getFirstVisibleMenu(items: MenuItem[]): MenuItem | undefined {
    for (const menu of items) {
      if (menu.items) {
        let val = this.getFirstVisibleMenu(menu.items);
        if (val) {
          return val;
        }
      } else if (menu.visible === true) {
        return menu;
      }
    }
    return undefined;
  }
}