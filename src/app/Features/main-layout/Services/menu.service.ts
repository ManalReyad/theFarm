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
        label: 'الخلطات',
        visible: true,
        icon: PrimeIcons.SITEMAP,
        iconStyle: { fontSize: '1.5rem' },
        routerLink: ['feed-mix'],
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
        expanded: this.shouldExpand([
          'warehouse/incoming',
          'warehouse/items-medicine',
          'warehouse/egg-production',
          'egg-sales',
        ]),
        items: [
          {
            label: 'مخزن المواد',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse/items-medicine'],
          },
          {
            label: 'إنتاج البيض',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse/egg-production'],
          },
          {
            label: 'مبيعات البيض',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse/egg-sales'],
          },
        ],
      },
      {
        label: 'مخزن الأصول',
        visible: true,
        icon: PrimeIcons.SERVER,
        iconStyle: { fontSize: '1.5rem' },
        expanded: this.shouldExpand([
          'warehouse-assets',
          'warehouse-assets-transactions',
        ]),
        items: [
          {
            label: 'أصول المزرعة',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse-assets'],
          },
          {
            label: 'عمليات مخزن الأصول',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse-assets-transactions'],
          },
        ],
      },
      {
        label: 'الإعدادات',
        visible: true,
        icon: PrimeIcons.COG,
        iconStyle: { fontSize: '1.5rem' },
        expanded: this.shouldExpand([
          'medicine',
          'raw-material',
          'assets',
          'traders',
          'warehouse/list',
          '/room',
          'farm',
          'workers'
        ]),
        items: [
          {
            label: 'المزارع',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['farm'],
          },
    
          {
            label: 'العنابر',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1.5rem' },
            routerLink: ['/room'],
          },
          {
            label: 'الأدوية',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['medicine'],
          },
          {
            label: 'المواد الخام',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['raw-material'],
          },
          {
            label: 'الأصول',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['assets'],
          },
          {
            label: 'التجار',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['traders'],
          },
          {
            label: 'الموظفين',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['workers'],
          },
          {
            label: 'المخازن',
            visible: true,
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            iconStyle: { fontSize: '1rem' },
            routerLink: ['warehouse/list'],
          },
        ],
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
