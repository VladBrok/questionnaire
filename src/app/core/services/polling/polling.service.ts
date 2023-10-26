import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  Subscriber,
  Subscription,
  fromEvent,
  timer,
} from 'rxjs';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  private readonly online = new BehaviorSubject(true);
  private readonly tabActive = new BehaviorSubject(true);

  constructor() {
    fromEvent(document, 'visibilitychange')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.tabActive.next(!document.hidden);
      });
    fromEvent(window, 'online')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.online.next(true);
      });
    fromEvent(window, 'offline')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.online.next(false);
      });
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
      if (!this.tabActive.value || !this.online.value) return;
      subscription.add(
        getObservable().subscribe({
          next: sub.next.bind(sub),
          error: sub.error.bind(sub),
        })
      );
      lastPoll = new Date();
    };

    subscription.add(this.online.subscribe((val) => val && checkLastPoll()));
    subscription.add(this.tabActive.subscribe((val) => val && checkLastPoll()));
    timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);

    return () => {
      subscription.unsubscribe();
      timerSubscription?.unsubscribe();
    };
  }
}
