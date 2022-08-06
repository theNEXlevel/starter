import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { tap } from 'rxjs';
import { UserRepository } from '../../state/user.repository';

@Component({
  selector: 'starter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  user$ = this.userRepo.user$.pipe(
    tap((user) => {
      if (user.user) {
        this.login?.hide();
      }
    })
  );

  @ViewChild('login') login?: OverlayPanel;

  constructor(private userRepo: UserRepository) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard',
      },
    ];
  }

  logoff(): void {
    this.userRepo.resetUser();
  }
}
