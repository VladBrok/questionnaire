import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    return new Observable((sub) => {
      const subscription = new Subscription();
      let timerSubscription: Subscription | null = null;
      let hasInternetConnection = true;
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
      const handleVisibilityChange = () => {
        isTabActive = !document.hidden;
        if (isTabActive) checkLastPoll();
      };
      const handleOnline = () => {
        hasInternetConnection = true;
        checkLastPoll();
      };
      const handleOffline = () => {
        hasInternetConnection = false;
      };
      const poll = () => {
        if (!isTabActive || !hasInternetConnection) return;
        subscription.add(
          getObservable().subscribe({
            next: sub.next.bind(sub),
            error: sub.error.bind(sub),
          })
        );
        lastPoll = new Date();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);

      return () => {
        subscription.unsubscribe();
        timerSubscription?.unsubscribe();
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    });
  }
}
