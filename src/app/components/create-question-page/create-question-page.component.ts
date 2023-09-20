import { Component, OnInit, ViewChild } from '@angular/core';
import { QUESTION_TYPES } from '../../core/config/QuestionType';
import { QuestionDirective } from '../../core/directives/question.directive';

@Component({
  selector: 'app-create-question-page',
  templateUrl: './create-question-page.component.html',
  styleUrls: ['./create-question-page.component.scss'],
})
export class CreateQuestionPageComponent implements OnInit {
  types = QUESTION_TYPES;
  selectedTypeId = QUESTION_TYPES[0].id;

  @ViewChild(QuestionDirective, { static: true })
  questionForm!: QuestionDirective;

  onTypeChange(newType: typeof this.selectedTypeId) {
    this.selectedTypeId = newType;
    this.loadFormComponent();
  }

  loadFormComponent() {
    const viewContainerRef = this.questionForm.viewContainerRef;
    viewContainerRef.clear();

    const formComponent = this.types.find(
      (x) => x.id === this.selectedTypeId
    )?.formComponent;

    if (!formComponent) {
      console.error(
        `formComponent for question type id ${this.selectedTypeId} was not found. Check question types`
      );
      return;
    }

    viewContainerRef.createComponent(formComponent as any);
  }

  ngOnInit(): void {
    this.loadFormComponent();
  }
}
