import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../core/services/question-service/question.service';
import { Question } from '../../core/models/Question';
import { QUESTION_TYPE } from '../../core/config/QuestionType';

@Component({
  selector: 'app-manage-questions-page',
  templateUrl: './manage-questions-page.component.html',
  styleUrls: ['./manage-questions-page.component.scss'],
})
export class ManageQuestionsPageComponent implements OnInit {
  questions: Question[] = [];

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  onDelete(id: number): void {
    this.questionService.remove(id);
    this.loadQuestions();
  }

  private loadQuestions() {
    this.questions = this.questionService.getAll();
  }

  getQuestionTypeLabel(question: Question) {
    return QUESTION_TYPE[question.type].label;
  }
}
