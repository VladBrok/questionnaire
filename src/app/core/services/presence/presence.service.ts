import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private isTabActive = true;
  private isOnline = true;
  readonly tabActiveAndOnline = new BehaviorSubject(true);

  constructor() {
    fromEvent(document, 'visibilitychange')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.isTabActive = !document.hidden;
        this.update();
      });
    fromEvent(window, 'online')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.isOnline = true;
        this.update();
      });
    fromEvent(window, 'offline')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.isOnline = false;
        this.update();
      });
  }

  private update() {
    this.tabActiveAndOnline.next(this.isTabActive && this.isOnline);
  }
}
