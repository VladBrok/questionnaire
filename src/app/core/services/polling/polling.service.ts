import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscriber,
  Subscription,
  fromEvent,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
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

  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    return new Observable<T>(this.subscribe.bind(this, getObservable));
  }

  private subscribe<T>(getObservable: () => Observable<T>, sub: Subscriber<T>) {
    const subscription = new Subscription();
    let timerSubscription: Subscription | null = null;
    let lastPoll: Date | null = null;

    const checkLastPoll = () => {
      if (
        lastPoll &&
        new Date().getTime() - lastPoll.getTime() > POLL_INTERVAL_MS
      ) {
        timerSubscription?.unsubscribe();
        timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);
      }
    };
    const poll = () => {
      if (!this.tabActiveAndOnline.value) return;
      subscription.add(
        getObservable().subscribe({
          next: sub.next.bind(sub),
          error: sub.error.bind(sub),
        })
      );
      lastPoll = new Date();
    };
    const teardown = () => {
      subscription.unsubscribe();
      timerSubscription?.unsubscribe();
    };

    subscription.add(
      this.tabActiveAndOnline.subscribe((val) => val && checkLastPoll())
    );
    timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);

    return teardown;
  }
}
