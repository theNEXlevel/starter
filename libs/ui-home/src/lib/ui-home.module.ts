import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHomeRoutingModule } from './ui-home-routing.module';
import { UiSharedModule } from 'shared';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, UiHomeRoutingModule, UiSharedModule],
})
export class UiHomeModule {}
