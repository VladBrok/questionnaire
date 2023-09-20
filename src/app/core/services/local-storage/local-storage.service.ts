import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(key: string) {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
