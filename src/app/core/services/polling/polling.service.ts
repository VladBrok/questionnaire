import { Injectable } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    return new Observable((sub) => {
      const subscription = new Subscription();
      let hasInternetConnection = true;
      let inactiveStart: Date | null = null;

      const handleVisibilityChange = () => {
        if (document.hidden) {
          inactiveStart = new Date();
        } else {
          if (
            inactiveStart &&
            new Date().getTime() - inactiveStart.getTime() > POLL_INTERVAL_MS
          ) {
            inactiveStart = null;
            poll();
          }
          inactiveStart = null;
        }
      };
      const handleOnline = () => {
        hasInternetConnection = true;
      };
      const handleOffline = () => {
        hasInternetConnection = false;
      };
      const poll = () => {
        if (inactiveStart || !hasInternetConnection) return;
        subscription.add(
          getObservable().subscribe({
            next: sub.next.bind(sub),
            error: sub.error.bind(sub),
          })
        );
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      subscription.add(interval(POLL_INTERVAL_MS).subscribe(poll));
      poll();

      return () => {
        subscription.unsubscribe();
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
