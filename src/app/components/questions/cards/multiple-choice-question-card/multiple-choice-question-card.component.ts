import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultipleChoicesQuestion } from '../../../../core/models/MultipleChoicesQuestion';
import { QuestionService } from '../../../../core/services/question-service/question.service';
import { QuestionCard } from '../../../../core/models/QuestionCard';

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
    this.loadQuestion();
  }

  private loadQuestion() {
    this.question = this.questionService.getSingle(
      this.id,
      'MULTIPLE_CHOICES'
    ) as MultipleChoicesQuestion;

    if (!this.question) {
      console.error(`question with id ${this.id} was not found`);
      return;
    }

    if (this.question.answeredAt) {
      this.answers = this.question.answers!.slice();
    } else {
      this.answers = Array(this.question.options.length).fill(false);
    }
  }

  onAnswer() {
    this.updateIsAnswered(true);
  }

  onRollback() {
    this.updateIsAnswered(false);
  }

  get isSomeAnswerSelected() {
    return this.answers.some(Boolean);
  }

  private updateIsAnswered(isAnswered: boolean) {
    if (isAnswered) {
      this.questionService.answer<MultipleChoicesQuestion>(this.id, {
        answers: this.answers,
      });
    } else {
      this.questionService.rollbackAnswer<MultipleChoicesQuestion>(this.id, {
        answers: undefined,
      });
    }
    this.change.emit();
  }
}
