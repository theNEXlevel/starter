import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@starter/libs/ui/shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@starter/libs/ui/home').then((m) => m.HomeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@starter/libs/ui/dashboard').then((m) => m.DashboardModule),
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
