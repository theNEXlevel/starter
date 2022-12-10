/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

import { FooterComponent } from './components/main/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/main/nav/nav.component';
import { LoginComponent } from './components/main/nav/login/login.component';

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
  MatSlideToggleModule,
];

@NgModule({
  declarations: [FooterComponent, MainComponent, LoginComponent, NavComponent],
  imports: [...sharedModules],
  exports: sharedModules,
})
export class UiSharedModule {
  public static forRoot(environment: any): ModuleWithProviders<UiSharedModule> {
    return {
      ngModule: UiSharedModule,
      providers: [
        {
          provide: 'env',
          useValue: environment,
        },
      ],
    };
  }
}
