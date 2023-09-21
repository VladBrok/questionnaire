import { ErrorHandler } from '@angular/core';
import { LocalStorageWriteError } from './LocalStorageWriteError';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (error instanceof LocalStorageWriteError) {
      alert(
        "Failed to write to the storage because it's full. Please remove some questions to free up storage space"
      );
    } else {
      console.error(error);
    }
  }
}
