import { NgModule } from '@angular/core';
import { SharedModule } from '@starter/ui/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
