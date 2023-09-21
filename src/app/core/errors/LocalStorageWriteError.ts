export class LocalStorageWriteError extends Error {
  constructor() {
    super();
    this.name = 'LocalStorageWriteError';
  }
}
