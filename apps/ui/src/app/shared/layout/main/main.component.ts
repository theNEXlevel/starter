import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { selectMsg } from '../../../state';

@Component({
  selector: 'starter-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  error$ = this.store.select(selectMsg).pipe(
    filter((err) => !!err.message),
    tap((err) => {
      this.snackBar.open(
        `${err.error ?? 'Error'} - ${Array.isArray(err.message) ? err.message.join(', ') : err.message}`,
        undefined,
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notif-error',
          duration: 3000,
        }
      );
    })
  );
  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.error$.subscribe();
  }
}
