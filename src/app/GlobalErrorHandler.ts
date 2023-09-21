import { ErrorHandler } from '@angular/core';
import { LocalStorageWriteError } from './core/errors/LocalStorageWriteError';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (error instanceof LocalStorageWriteError) {
      console.error('localstorage is full');
    } else {
      console.error(error);
    }
  }
}
