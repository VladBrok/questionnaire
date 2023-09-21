import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultipleChoicesQuestion } from '../../core/models/MultipleChoicesQuestion';
import { QuestionService } from '../../core/services/question-service/question.service';
import { QuestionCard } from '../../core/models/QuestionCard';

@Component({
  selector: 'app-multiple-choice-question-card',
  templateUrl: './multiple-choice-question-card.component.html',
  styleUrls: ['./multiple-choice-question-card.component.scss'],
})
export class MultipleChoiceQuestionCardComponent implements QuestionCard {
  answers: boolean[] = [];
  question?: MultipleChoicesQuestion;

  @Input() id!: number;
  @Output() change = new EventEmitter<void>();

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.initQuestion();
  }

  private initQuestion() {
    this.question = this.questionService.getSingle(
      this.id,
      'MULTIPLE_CHOICES'
    ) as MultipleChoicesQuestion;

    if (!this.question) {
      console.error(`question with id ${this.id} was not found`);
      return;
    }

    if (this.question.answeredAt) {
      this.answers = this.question.answers.slice();
    } else {
      this.answers = Array(this.question.answers.length).fill(false);
    }
  }

  get isAnswerValid() {
    return (
      this.answers.length === this.question?.answers.length &&
      this.answers.every((answer, i) => answer === this.question?.answers[i])
    );
  }

  onAnswer() {
    this.updateIsAnswered(true);
  }

  onRollback() {
    this.updateIsAnswered(false);
  }

  private updateIsAnswered(isAnswered: boolean) {
    if (isAnswered) {
      this.questionService.answer(this.id);
    } else {
      this.questionService.rollbackAnswer(this.id);
    }
    this.change.emit();
  }
}
