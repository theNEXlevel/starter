import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [RegisterRoutingModule, SharedModule],
})
export class RegisterModule {}
