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

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  startPolling<T>(getObservable: () => Observable<T>): Observable<T> {
    const start = new Subject<void>();
    const stop = new Subject<void>();
    let isStopped = false;
    return merge(
      timer(0, POLL_INTERVAL_MS).pipe(
        takeUntil(stop),
        repeat({ delay: () => start })
      ),
      fromEvent(document, 'visibilitychange').pipe(
        filter(() => !document.hidden)
      ),
      fromEvent(window, 'online'),
      start.pipe(
        tap(() => (isStopped = false)),
        filter(() => false)
      ),
      stop.pipe(
        tap(() => (isStopped = true)),
        filter(() => false)
      )
    ).pipe(
      tap(
        (e) =>
          (!navigator.onLine || document.hidden) &&
          typeof e === 'number' &&
          stop.next()
      ),
      tap(
        (e) =>
          typeof e !== 'number' &&
          navigator.onLine &&
          !document.hidden &&
          isStopped &&
          start.next()
      ),
      filter(
        (e) => navigator.onLine && !document.hidden && typeof e === 'number'
      ),
      switchMap(() => getObservable())
    );
  }
}
