import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, timer } from 'rxjs';
import { PresenceService } from '../presence/presence.service';

const POLL_INTERVAL_MS = 10000;
@Injectable({
  providedIn: 'root',
})
export class PollingService {
  constructor(private readonly presenceService: PresenceService) {}

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
      if (!this.presenceService.tabActiveAndOnline.value) return;
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
      this.presenceService.tabActiveAndOnline.subscribe(
        (val) => val && checkLastPoll()
      )
    );
    timerSubscription = timer(0, POLL_INTERVAL_MS).subscribe(poll);

    return teardown;
  }
}
