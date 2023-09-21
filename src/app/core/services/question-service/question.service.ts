import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Question } from '../../models/Question';
import { QuestionPatch } from '../../models/QuestionPatch';
import { QUESTION_TYPE } from '../../config/QuestionType';
import { LocalStorageWriteError } from '../../errors/LocalStorageWriteError';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  add<T extends Question>(question: QuestionPatch<T>) {
    const questions = this.getAll();
    const ids = questions.length ? questions.map((x) => x.id) : [0];
    const id = Math.max(...ids) + 1;
    questions.push({
      id,
      createdAt: new Date().toISOString(),
      ...question,
    });
    this.save(questions);
  }

  update<T extends Question>(id: number, data: Partial<T>) {
    const questions = this.getAll();
    const idx = questions.findIndex((x) => x.id === id);

    if (idx < 0) {
      return;
    }

    questions[idx] = { ...questions[idx], ...data };
    this.save(questions);
  }

  getAll() {
    const questions: Question[] =
      this.localStorageService.getItem('questions') || [];

    return this.sort(questions, 'createdAt').sort();
  }

  sort(
    questions: Question[],
    sortField: keyof Pick<Question, 'createdAt' | 'answeredAt'>
  ) {
    return questions
      .slice()
      .sort(
        (a, b) =>
          new Date(b[sortField] || '').getTime() -
          new Date(a[sortField] || '').getTime()
      );
  }

  getSingle(id: number, type?: keyof typeof QUESTION_TYPE) {
    const questions = this.getAll();
    return questions.find((x) => x.id === id && (!type || x.type === type));
  }

  remove(id: number) {
    const questions = this.getAll();
    const removed = questions.filter((x) => x.id !== id);
    this.save(removed);
  }

  answer<T extends Question>(id: number, data?: Partial<T>) {
    this.update(id, {
      ...data,
      answeredAt: new Date().toISOString(),
    });
  }

  rollbackAnswer<T extends Question>(id: number, data?: Partial<T>) {
    this.update(id, {
      ...data,
      answeredAt: undefined,
    });
  }

  private save(questions: Question[]) {
    try {
      this.localStorageService.setItem('questions', questions);
    } catch {
      throw new LocalStorageWriteError();
    }
  }
}
