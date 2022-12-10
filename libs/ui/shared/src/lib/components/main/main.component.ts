import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { selectMsg } from '../../state';

@Component({
  selector: 'sta--main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  error$ = this.store.select(selectMsg).pipe(
    filter((err) => !!err.message),
    tap((err) => {
      this.snackBar.open(
        `${err.error ?? 'Success'} - ${Array.isArray(err.message) ? err.message.join(', ') : err.message}`,
        undefined,
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: err.error ? 'notif-error' : 'notif-success',
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
