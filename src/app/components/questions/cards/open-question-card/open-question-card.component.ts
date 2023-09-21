import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionService } from '../../../../core/services/question-service/question.service';
import { OpenQuestion } from '../../../../core/models/OpenQuestion';

@Component({
  selector: 'app-open-question-card',
  templateUrl: './open-question-card.component.html',
  styleUrls: ['./open-question-card.component.scss'],
})
export class OpenQuestionCardComponent {
  answer = '';
  question?: OpenQuestion;

  @Input() id!: number;
  @Output() change = new EventEmitter<void>();

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  private loadQuestion() {
    this.question = this.questionService.getSingle(
      this.id,
      'OPEN'
    ) as OpenQuestion;

    if (!this.question) {
      console.error(`question with id ${this.id} was not found`);
      return;
    }

    if (this.question.answeredAt) {
      this.answer = this.question.answer;
    }
  }

  get isAnswerValid() {
    return this.answer.length > 0 && this.answer.length <= 255;
  }

  onAnswer() {
    this.updateIsAnswered(true);
  }

  onRollback() {
    this.updateIsAnswered(false);
  }

  private updateIsAnswered(isAnswered: boolean) {
    if (isAnswered) {
      this.questionService.answer<OpenQuestion>(this.id, {
        answer: this.answer,
      });
    } else {
      this.questionService.rollbackAnswer<OpenQuestion>(this.id, {
        answer: '',
      });
    }
    this.change.emit();
  }
}
