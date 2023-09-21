import { Component, Input, OnInit } from '@angular/core';
import { QuestionCard } from '../../core/models/QuestionCard';
import { SingleChoiceQuestion } from '../../core/models/SingleChoiceQuestion';
import { QuestionService } from '../../core/services/question-service/question.service';

@Component({
  selector: 'app-single-choice-question-card',
  templateUrl: './single-choice-question-card.component.html',
  styleUrls: ['./single-choice-question-card.component.scss'],
})
export class SingleChoiceQuestionCardComponent implements QuestionCard, OnInit {
  @Input() id!: number;
  question?: SingleChoiceQuestion;

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit(): void {
    this.question = this.questionService.getSingle(
      this.id,
      'SINGLE_CHOICE'
    ) as SingleChoiceQuestion;
  }
}
