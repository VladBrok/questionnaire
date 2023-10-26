import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, fromEvent, timer } from 'rxjs';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    return new Observable<T>(this.subscribe.bind(this, getObservable));
  }

  private subscribe<T>(getObservable: () => Observable<T>, sub: Subscriber<T>) {
    const subscription = new Subscription();
    let timerSubscription: Subscription | null = null;
    let isOnline = true;
    let isTabActive = true;
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
    const handleVisibleChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) checkLastPoll();
    };
    const handleOnline = () => {
      isOnline = true;
      checkLastPoll();
    };
    const handleOffline = () => {
      isOnline = false;
    };
    const poll = () => {
      if (!isTabActive || !isOnline) return;
      subscription.add(
        getObservable().subscribe({
          next: sub.next.bind(sub),
          error: sub.error.bind(sub),
        })
      );
      lastPoll = new Date();
    };

    subscription.add(
      fromEvent(document, 'visibilitychange').subscribe(handleVisibleChange)
    );
    subscription.add(fromEvent(window, 'online').subscribe(handleOnline));
    subscription.add(fromEvent(window, 'offline').subscribe(handleOffline));
    timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);

    return () => {
      subscription.unsubscribe();
      timerSubscription?.unsubscribe();
    };
  }
}
