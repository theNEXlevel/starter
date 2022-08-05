import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent],
  imports: [CommonModule, MenubarModule, InputTextModule, ButtonModule, TabViewModule, CardModule],
  exports: [MenubarModule, InputTextModule, ButtonModule, TabViewModule, CardModule],
})
export class SharedModule {}
