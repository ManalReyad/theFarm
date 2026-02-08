import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus: MenuItem[] = [];
  constructor(private router: Router) {}

  initializeMenus() {
    this.menus = [
      // {
      //   label: 'الرئيسية',
      //   visible: true,
      //   icon: PrimeIcons.HOME,
      //   iconStyle: { fontSize: '1.5rem' },
      //   routerLink: ['home'],
      // },
      {
        label: 'المزارع',
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
        label: 'الدورات',
        visible: true,
        icon: PrimeIcons.SYNC,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['cycle'],
      },
      {
        label: 'الأصول',
        visible: true,
        icon: PrimeIcons.BOX,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['assets'],
      },
      {
        label: 'عمليات مخزن الأصول',
        visible: true,
        icon: PrimeIcons.HISTORY,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['warehouse-assets-transactions'],
      },
      {
        label: 'مخزن الأصول',
        visible: true,
        icon: PrimeIcons.SERVER,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['warehouse-assets'],
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
        expanded: this.shouldExpand(['warehouse/incoming', 'warehouse/items-medicine','warehouse/egg-production','egg-sales']),
        items: [
          {
            label: 'توريد أصناف وأدوية',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['warehouse/items-medicine'],
          },
          {
            label: 'إنتاج البيض',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['warehouse/egg-production'],
          },
          {
            label: 'مبيعات البيض',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['warehouse/egg-sales'],
          },
        ],
      },
      {
        label: 'الأدوية',
        visible: true,
        icon: 'fa-solid fa-capsules',
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['medicine'],
      },
      {
        label: 'المواد الخام',
        visible: true,
        icon: PrimeIcons.DATABASE,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['raw-material'],
      },
      {
        label: 'الخلطات',
        visible: true,
        icon: PrimeIcons.SITEMAP,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['feed-mix'],
      },
      {
        label: 'الموردين',
        visible: true,
        icon: PrimeIcons.USERS,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['traders'],
      },
    ];
  }

  private shouldExpand(possibleRoutes: string[]): boolean {
    const current = this.router.url;
    return possibleRoutes.some((r) => current.includes(r));
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
