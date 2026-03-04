import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cycle',
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'farm',
        loadChildren: () =>
          import('../farm/farm.module').then((m) => m.FarmModule),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('../room/room.module').then((m) => m.RoomModule),
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('../assets/assets.module').then((m) => m.AssetsModule),
      },
      {
        path: 'cycle',
        loadChildren: () =>
          import('../cycle/cycle.module').then((m) => m.CycleModule),
      },
      {
        path: 'daily-registration',
        loadChildren: () =>
          import('../daily-registration/daily-registration.module').then(
            (m) => m.DailyRegistrationModule,
          ),
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('../warehouse/warehouse.module').then(
            (m) => m.WarehouseModule,
          ),
      },
      {
        path: 'warehouse-assets',
        loadChildren: () =>
          import('../wharehouse-assets/wharehouse-assets.module').then(
            (m) => m.WharehouseAssetsModule,
          ),
      },
       {
        path: 'warehouse-assets-transactions',
        loadChildren: () =>
          import('../transactions/transactions.module').then(
            (m) => m.TransactionsModule,
          ),
      },
      {
        path: 'traders',
        loadChildren: () =>
          import('../traders/traders.module').then(
            (m) => m.TradersModule,
          ),
      },
      {
        path: 'feed-mix',
        loadChildren: () =>
          import('../feed-mix/feed-mix.module').then((m) => m.FeedMixModule),
      },
      {
        path: 'treasury',
        loadChildren: () =>
          import('../treasury/treasury.module').then((m) => m.TreasuryModule),
      },
      {
        path: 'medicine',
        loadChildren: () =>
          import('../medicine/medicine.module').then((m) => m.MedicineModule),
      },
      {
        path: 'raw-material',
        loadChildren: () =>
          import('../raw-material/raw-material.module').then((m) => m.RawMaterialModule),
      },
      {
        path: 'evaluation-items',
        loadChildren: () =>
          import('../evaluation/evaluation.module').then((m) => m.EvaluationModule),
      },
      {
        path: 'workers',
        loadChildren: () =>
          import('../workers/workers.module').then((m) => m.WorkersModule),
      },
      {
        path: 'dialy-summary',
        loadChildren: () =>
          import('../daily-summary/daily-summary.module').then((m) => m.DailySummaryModule),
      },
      {
        path: 'cash-box',
        loadChildren: () =>
          import('../cash-box/cash-box.module').then((m) => m.CashBoxModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
