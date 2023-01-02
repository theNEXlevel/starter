import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@starter/ui/shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@starter/ui/home').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('@starter/ui/auth').then((m) => m.AuthModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@starter/ui/dashboard').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
