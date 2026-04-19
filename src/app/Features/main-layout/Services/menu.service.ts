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
      {
        label: 'الملخص اليومي',
        icon: PrimeIcons.CALENDAR,
        routerLink: ['dialy-summary'],
      },

      {
        label: 'التسجيل اليومي',
        icon: PrimeIcons.FILE_EDIT,
        routerLink: ['daily-registration'],
      },

      {
        label: 'إنتاج البيض',
        icon: PrimeIcons.INBOX,
        routerLink: ['warehouse/egg-production'],
      },
      {
        label: 'إنتاج كل دورة',
        icon: PrimeIcons.BOX,
        routerLink: ['summary-by-cycle'],
      },

      {
        label: 'المستهدف',
        icon: PrimeIcons.CHART_BAR,
        expanded: this.shouldExpand(['reports/feed-consumption','reports/egg-production']),
        items: [
          {
            label: 'تقرير استهلاك العلف',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['reports/feed-consumption'],
          },
          {
            label: 'تقرير إنتاج البيض',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['reports/egg-production'],
          },
        ],
      },

      {
        label: 'الخلطات',
        icon: PrimeIcons.SITEMAP,
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
        label: 'الخزنة',
        icon: PrimeIcons.MONEY_BILL,
        routerLink: ['cash-box'],
      },

      {
        label: 'المبيعات',
        icon: PrimeIcons.CHART_LINE,
        expanded: this.shouldExpand([
          'warehouse/egg-sales',
          'warehouse/chicken-sales',
        ]),
        items: [
          {
            label: 'مبيعات البيض',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse/egg-sales'],
          },
          {
            label: 'مبيعات الفراخ',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse/chicken-sales'],
          },
        ],
      },

      {
        label: 'المخزن',
        icon: PrimeIcons.WAREHOUSE,
        expanded: this.shouldExpand([
          'warehouse/items-medicine',
          'warehouse/egg-stock',
        ]),
        items: [
          {
            label: 'مخزن المواد',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse/items-medicine'],
          },
          {
            label: 'مخزون البيض',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse/egg-stock'],
          },
        ],
      },

      {
        label: 'إعدادات المستهدف',
        icon: 'fa-solid fa-bullseye',
        expanded: this.shouldExpand([
          'targets/mortality',
          'targets/feed',
          'targets/egg-production',
        ]),
        items: [
          {
            label: ' النافق',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['targets/mortality'],
          },
          {
            label: ' استهلاك العلف',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['targets/feed'],
          },
          {
            label: ' إنتاج البيض',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['targets/egg'],
          },
        ],
      },

      {
        label: 'مخزن الأصول',
        icon: PrimeIcons.SERVER,
        expanded: this.shouldExpand([
          'warehouse-assets',
          'warehouse-assets-transactions',
        ]),
        items: [
          {
            label: 'أصول المزرعة',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse-assets'],
          },
          {
            label: 'عمليات مخزن الأصول',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            routerLink: ['warehouse-assets-transactions'],
          },
        ],
      },
      {
        label: 'المستخدمين',
        icon: PrimeIcons.USERS,
        expanded: this.shouldExpand(['traders', 'clients', 'workers','bonus']),
        items: [
          {
            label: 'الموردين',
            icon: PrimeIcons.CIRCLE_FILL,
            iconStyle: { fontSize: '.8rem' },
            routerLink: ['traders'],
          },
          {
            label: 'العملاء',
            icon: PrimeIcons.CIRCLE_FILL,
            iconStyle: { fontSize: '.8rem' },
            routerLink: ['clients'],
          },
          {
            label: 'الموظفين',
            icon: PrimeIcons.CIRCLE_FILL,
            iconStyle: { fontSize: '.8rem' },
            routerLink: ['workers'],
          },
          {
            label: 'المكآفات',
            icon: PrimeIcons.CIRCLE_FILL,
            iconStyle: { fontSize: '.8rem' },
            routerLink: ['bonus'],
          },
        ],
      },
      {
        label: 'الإعدادات',
        icon: PrimeIcons.COG,
        expanded: this.shouldExpand([
          'farm',
          'room',
          'breeds',
          'medicine',
          'raw-material',
          'traders',
          'clients',
          'workers',
          'warehouse/list',
          'evaluation-items',
          'assets',
        ]),
        items: [
          {
            label: 'بيانات المزرعة',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            expanded: this.shouldExpand(['farm', 'room', 'breeds']),
            items: [
              {
                label: 'المزارع',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['farm'],
              },
              {
                label: 'العنابر',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['/room'],
              },
              {
                label: 'السلالات',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['/breeds'],
              },
            ],
          },

          {
            label: 'المخزون والمواد',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            expanded: this.shouldExpand([
              'medicine',
              'raw-material',
              'warehouse/list',
            ]),
            items: [
              {
                label: 'الأدوية',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['medicine'],
              },
              {
                label: 'المواد الخام',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['raw-material'],
              },
              {
                label: 'المخازن',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['warehouse/list'],
              },
            ],
          },

          {
            label: 'الأصول والتقييم',
            icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
            expanded: this.shouldExpand(['assets', 'evaluation-items']),
            items: [
              {
                label: 'الأصول',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['assets'],
              },
              {
                label: 'بنود التقييم',
                icon: PrimeIcons.CIRCLE_FILL,
                iconStyle: { fontSize: '.8rem' },
                routerLink: ['evaluation-items'],
              },
            ],
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
  // initializeMenus() {
  //   this.menus = [
  //     {
  //       label: 'الدورات',
  //       visible: true,
  //       icon: PrimeIcons.SYNC,
  //       iconStyle: { fontSize: '1.5rem' },
  //       routerLink: ['cycle'],
  //     },
  //     {
  //       label: 'التسجيل اليومي',
  //       visible: true,
  //       icon: PrimeIcons.FILE_EDIT,
  //       iconStyle: { fontSize: '1.5rem' },
  //       routerLink: ['daily-registration'],
  //     },
  //     {
  //       label: 'الخلطات',
  //       visible: true,
  //       icon: PrimeIcons.SITEMAP,
  //       iconStyle: { fontSize: '1.5rem' },
  //       routerLink: ['feed-mix'],
  //     },

  //     {
  //       label: 'المخزن',
  //       visible: true,
  //       icon: PrimeIcons.WAREHOUSE,
  //       iconStyle: { fontSize: '1.5rem' },
  //       expanded: this.shouldExpand([
  //         'warehouse/incoming',
  //         'warehouse/items-medicine',
  //         'warehouse/egg-production',
  //         'egg-sales',
  //         'warehouse/chicken-sales',
  //       ]),
  //       items: [
  //         {
  //           label: 'مخزن المواد',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse/items-medicine'],
  //         },
  //         {
  //           label: 'إنتاج البيض',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse/egg-production'],
  //         },
  //         {
  //           label: 'مبيعات البيض',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse/egg-sales'],
  //         },
  //         {
  //           label: 'مبيعات الفراخ',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse/chicken-sales'],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'مخزن الأصول',
  //       visible: true,
  //       icon: PrimeIcons.SERVER,
  //       iconStyle: { fontSize: '1.5rem' },
  //       expanded: this.shouldExpand([
  //         'warehouse-assets',
  //         'warehouse-assets-transactions',
  //       ]),
  //       items: [
  //         {
  //           label: 'أصول المزرعة',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse-assets'],
  //         },
  //         {
  //           label: 'عمليات مخزن الأصول',
  //           visible: true,
  //           icon: PrimeIcons.ANGLE_DOUBLE_LEFT,
  //           iconStyle: { fontSize: '1rem' },
  //           routerLink: ['warehouse-assets-transactions'],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'الإعدادات',
  //       visible: true,
  //       icon: PrimeIcons.COG,
  //       expanded: true,
  //       items: [
  //         {
  //           label: 'البيانات الأساسية',
  //           icon: PrimeIcons.FOLDER,
  //           expanded: true,
  //           items: [
  //             {
  //               label: 'المزارع',
  //               routerLink: ['farm'],
  //             },
  //             {
  //               label: 'العنابر',
  //               routerLink: ['/room'],
  //             },
  //             {
  //               label: 'الموظفين',
  //               routerLink: ['workers'],
  //             },
  //             {
  //               label: 'التجار',
  //               routerLink: ['traders'],
  //             },
  //           ],
  //         },
  //         {
  //           label: 'عناصر التشغيل والمخزون',
  //           icon: PrimeIcons.BOX,
  //           expanded: true,
  //           items: [
  //             {
  //               label: 'الأدوية',
  //               routerLink: ['medicine'],
  //             },
  //             {
  //               label: 'المواد الخام',
  //               routerLink: ['raw-material'],
  //             },
  //             {
  //               label: 'الأصول',
  //               routerLink: ['assets'],
  //             },
  //             {
  //               label: 'المخازن',
  //               routerLink: ['warehouse/list'],
  //             },
  //             {
  //               label: 'بنود التقييم',
  //               routerLink: ['evaluation-items'],
  //             },
  //           ],
  //         },
  //       ],
  //     }
  //   ];
  // }
}
