import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

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

  ngOnInit(): void {
    this.error$.subscribe();
  }
}
