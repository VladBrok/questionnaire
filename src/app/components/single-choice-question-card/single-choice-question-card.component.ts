import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionCard } from '../../core/models/QuestionCard';
import { SingleChoiceQuestion } from '../../core/models/SingleChoiceQuestion';
import { QuestionService } from '../../core/services/question-service/question.service';

@Component({
  selector: 'app-single-choice-question-card',
  templateUrl: './single-choice-question-card.component.html',
  styleUrls: ['./single-choice-question-card.component.scss'],
})
export class SingleChoiceQuestionCardComponent implements QuestionCard, OnInit {
  answerIdx = 0;
  question?: SingleChoiceQuestion;

  @Input() id!: number;
  @Output() change = new EventEmitter<void>();

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.initQuestion();
  }

  private initQuestion() {
    this.question = this.questionService.getSingle(
      this.id,
      'SINGLE_CHOICE'
    ) as SingleChoiceQuestion;
  }

  get isAnswerValid() {
    return this.answerIdx === this.question?.answerOptionIdx;
  }

  onAnswer() {
    this.updateIsAnswered(true);
  }

  onRollback() {
    this.updateIsAnswered(false);
  }

  private updateIsAnswered(isAnswered: boolean) {
    this.questionService.update(this.id, { isAnswered });
    this.initQuestion();
    this.change.emit();
  }
}
