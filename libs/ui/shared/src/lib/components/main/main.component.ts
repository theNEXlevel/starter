import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { selectUserMsg } from '../../state';

@Component({
  selector: 'sta-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

  error$ = this.store.select(selectUserMsg).pipe(
    filter((err) => !!err.message),
    tap((err) => {
      const success = err?.statusCode && err.statusCode >= 200 && err.statusCode < 300;
      this.snackBar.open(
        `${success ? 'Success' : 'Error'} - ${Array.isArray(err.message) ? err.message.join(', ') : err.message}`,
        undefined,
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
    })
  );

  ngOnInit(): void {
    this.error$.subscribe();
  }
}
