import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { QuestionCard } from '../../../../core/models/QuestionCard';
import { SingleChoiceQuestion } from '../../../../core/models/SingleChoiceQuestion';
import { QuestionService } from '../../../../core/services/question-service/question.service';

@Component({
  selector: 'app-single-choice-question-card',
  templateUrl: './single-choice-question-card.component.html',
  styleUrls: ['./single-choice-question-card.component.scss'],
})
export class SingleChoiceQuestionCardComponent implements QuestionCard, OnInit {
  answerIdx?: number;
  question?: SingleChoiceQuestion;

  @Input() id!: number;
  @Output() change = new EventEmitter<void>();

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  private loadQuestion() {
    this.question = this.questionService.getSingle(
      this.id,
      'SINGLE_CHOICE'
    ) as SingleChoiceQuestion;

    if (!this.question) {
      console.error(`question with id ${this.id} was not found`);
      return;
    }

    if (this.question.answeredAt) {
      this.answerIdx = this.question.answerOptionIdx;
    }
  }

  onAnswer() {
    this.updateIsAnswered(true);
  }

  onRollback() {
    this.updateIsAnswered(false);
  }

  private updateIsAnswered(isAnswered: boolean) {
    if (isAnswered) {
      this.questionService.answer<SingleChoiceQuestion>(this.id, {
        answerOptionIdx: this.answerIdx,
      });
    } else {
      this.questionService.rollbackAnswer<SingleChoiceQuestion>(this.id, {
        answerOptionIdx: undefined,
      });
    }
    this.change.emit();
  }
}
