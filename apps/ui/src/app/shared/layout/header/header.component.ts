import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'starter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard',
      },
    ];
  }
}
