import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './layout/nav/login/login.component';
import { NavComponent } from './layout/nav/nav.component';
import { RouterModule } from '@angular/router';

const sharedModules = [
  ReactiveFormsModule,
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  OverlayModule,
  MatCardModule,
  RouterModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [FooterComponent, MainComponent, LoginComponent, NavComponent],
  imports: sharedModules,
  exports: sharedModules,
})
export class SharedModule {}
