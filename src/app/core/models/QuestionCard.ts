import { EventEmitter } from '@angular/core';

export interface QuestionCard {
  id: number;
  change: EventEmitter<void>;
}
