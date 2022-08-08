import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
        this.messageSvc.add({
          severity: 'error',
          summary: `${err.error.error}`,
          detail: `${err.error.message.join(', ')}`,
        });
      }
    })
  );
  constructor(private messageSvc: MessageService, private errorRepo: ErrorRepository) {}

  ngOnInit(): void {
    this.error$.subscribe();
  }
}
