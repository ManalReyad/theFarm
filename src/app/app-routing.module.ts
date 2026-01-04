import { NgModule } from '@angular/core';
import { LoginComponent } from './Features/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Features/main-layout/main-layout.module').then(
        (m) => m.MainLayoutModule
      ),
  //  canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
