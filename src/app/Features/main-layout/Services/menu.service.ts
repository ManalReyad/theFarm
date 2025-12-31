import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus: MenuItem[] = [];
  constructor() {}

  initializeMenus() {
    this.menus = [
      {
        label: 'الرئيسية',
        visible: true,
        icon: PrimeIcons.HOME,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['home'],
      },
      {
        label: 'المزرعة',
        visible: true,
        icon: PrimeIcons.BUILDING_COLUMNS,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['farm'],
      },

      {
        label: 'العنابر',
        visible: true,
        icon: PrimeIcons.SHOP,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['/room'],
      },
      {
        label: 'الأصول',
        visible: true,
        icon: PrimeIcons.SITEMAP,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['assets'],
      },
      {
        label: 'الدورات',
        visible: true,
        icon: PrimeIcons.SYNC,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['cycle'],
      },
      {
        label: 'التسجيل اليومي',
        visible: true,
        icon: PrimeIcons.FILE_EDIT,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['daily-registration'],
      },
      {
        label: 'المخزن',
        visible: true,
        icon: PrimeIcons.WAREHOUSE,
        iconStyle: { fontSize: '1.5rem' },
        //routerLink: ['daily-registration'],
        items:[
          {
            label: 'الصادرة',
            visible: true,
           // icon: PrimeIcons.FILE_EDIT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['outgoing'],
          },
          {
            label: 'الواردة',
            visible: true,
           // icon: PrimeIcons.FILE_EDIT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['incoming'],
          },
        ]
      },
    ];
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
