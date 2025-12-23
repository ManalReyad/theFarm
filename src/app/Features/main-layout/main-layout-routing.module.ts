import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'farm',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
