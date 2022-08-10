import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable } from 'rxjs';
import { UserProps, UserRepository } from '../../state/user.repository';

@Component({
  selector: 'starter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  user$!: Observable<UserProps>;
  @ViewChild('login') login?: OverlayPanel;

  constructor(private userRepo: UserRepository) {}

  ngOnInit(): void {
    this.user$ = this.userRepo.user$;
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
