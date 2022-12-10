import { NgModule } from '@angular/core';
import { UiSharedModule } from 'shared';
import { UiDashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [UiSharedModule, UiDashboardRoutingModule],
})
export class UiDashboardModule {}
