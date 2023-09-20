import { Component } from '@angular/core';
import { QUESTION_TYPES } from '../../core/models/QuestionType';

@Component({
  selector: 'app-create-question-page',
  templateUrl: './create-question-page.component.html',
  styleUrls: ['./create-question-page.component.scss'],
})
export class CreateQuestionPageComponent {
  types = QUESTION_TYPES;
  selectedTypeId = QUESTION_TYPES[0].id;
}
