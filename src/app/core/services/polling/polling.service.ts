import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  filter,
  fromEvent,
  merge,
  repeat,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    const start = new Subject<void>();
    const stop = new Subject<void>();
    let isStopped = false;
    return merge(
      timer(0, 10000).pipe(
        takeUntil(stop),
        repeat({ delay: () => start }),
        tap(() => (!navigator.onLine || document.hidden) && stop.next()),
        filter(() => navigator.onLine && !document.hidden)
      ),
      merge(
        fromEvent(document, 'visibilitychange'),
        fromEvent(window, 'online')
      ).pipe(
        tap(
          () =>
            navigator.onLine && !document.hidden && isStopped && start.next()
        ),
        filter(() => false)
      ),
      merge(
        start.pipe(tap(() => (isStopped = false))),
        stop.pipe(tap(() => (isStopped = true)))
      ).pipe(filter(() => false))
    ).pipe(switchMap(getObservable));
  }
}
