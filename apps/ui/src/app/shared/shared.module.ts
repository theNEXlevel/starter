import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './layout/header/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const primeModules = [MenubarModule, InputTextModule, ButtonModule, TabViewModule, CardModule, OverlayPanelModule];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent, LoginComponent],
  imports: [ReactiveFormsModule, CommonModule, ...primeModules],
  exports: primeModules,
})
export class SharedModule {}
