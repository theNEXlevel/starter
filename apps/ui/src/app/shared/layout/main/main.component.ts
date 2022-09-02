import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { ErrorRepository } from '../../state/error.respository';

@Component({
  selector: 'starter-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  error$ = this.errorRepo.error$.pipe(
    tap((err) => {
      if (err.error.message) {
        this.snackBar.open(
          `${err.error.error ?? 'Error'} - ${
            Array.isArray(err.error.message) ? err.error.message.join(', ') : err.error.message
          }`,
          undefined,
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'notif-error',
            duration: 3000,
          }
        );
      }
    })
  );
  constructor(private errorRepo: ErrorRepository, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.error$.subscribe();
  }
}
