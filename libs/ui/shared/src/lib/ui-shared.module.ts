import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FooterComponent } from './components/main/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/main/nav/nav.component';
import { LoginComponent } from './components/main/nav/login/login.component';
import { Environment } from '@starter/interfaces';
import { ENV } from '@starter/libs/ui/tokens';

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
  public static forRoot(environment: Environment): ModuleWithProviders<UiSharedModule> {
    return {
      ngModule: UiSharedModule,
      providers: [
        {
          provide: ENV,
          useValue: environment,
        },
      ],
    };
  }
}
