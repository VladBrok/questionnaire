import { Component } from '@angular/core';
import { PollingService } from './core/services/polling/polling.service';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'questionnaire';

  constructor(private readonly pollingService: PollingService) {
    this.pollingService
      .startPolling(() => of(Math.random()))
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        console.log(
          new Date().toLocaleTimeString('en-US', { hour12: false }),
          '   ',
          result
        );
      });
  }
}
