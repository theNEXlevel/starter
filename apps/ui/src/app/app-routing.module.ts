import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@starter/ui-shared';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./routes/home-wrapper.module').then((m) => m.HomeWrapperModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./routes/dashboard-wrapper.module').then((m) => m.DashboardWrapperModule),
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
