import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Question } from '../../models/Question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  add<T extends Omit<Question, 'id'>>(question: T) {
    const questions = this.getAll();
    const ids = questions.length ? questions.map((x) => x.id) : [0];
    const id = Math.max(...ids) + 1;
    questions.push({ id, ...question });
    this.localStorageService.setItem('questions', questions);
  }

  getAll() {
    const questions: Question[] =
      this.localStorageService.getItem('questions') || [];

    return questions;
  }
}
