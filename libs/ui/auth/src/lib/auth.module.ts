import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule],
  declarations: [ConfirmComponent],
})
export class AuthModule {}
