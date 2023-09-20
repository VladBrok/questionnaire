import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Question } from '../../models/Question';
import { QuestionToAdd } from '../../models/QuestionToAdd';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  add<T extends Question>(question: QuestionToAdd<T>) {
    const questions = this.getAll();
    const ids = questions.length ? questions.map((x) => x.id) : [0];
    const id = Math.max(...ids) + 1;
    questions.push({
      id,
      isAnswered: false,
      createdAt: new Date().toISOString(),
      ...question,
    });
    this.save(questions);
  }

  getAll() {
    const questions: Question[] =
      this.localStorageService.getItem('questions') || [];

    return questions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  remove(id: number) {
    const questions = this.getAll();
    const removed = questions.filter((x) => x.id !== id);
    this.save(removed);
  }

  private save(questions: Question[]) {
    this.localStorageService.setItem('questions', questions);
  }
}
