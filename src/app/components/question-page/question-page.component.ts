import { Component, OnInit, ViewChild } from '@angular/core';
import { QUESTION_TYPES } from '../../core/config/QuestionType';
import { QuestionDirective } from '../../core/directives/question.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../core/services/question-service/question.service';
import { QuestionForm } from '../../core/models/QuestionForm';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {
  types = QUESTION_TYPES;
  selectedTypeId = QUESTION_TYPES[0].id;
  id?: number;

  @ViewChild(QuestionDirective, { static: true })
  questionForm!: QuestionDirective;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly questionService: QuestionService
  ) {}

  get title() {
    return this.id == null ? 'Create a question' : 'Edit the question';
  }

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

    const componentRef =
      viewContainerRef.createComponent<QuestionForm>(formComponent);
    componentRef.instance.id = this.id;
  }

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    this.id = !idStr || Number.isNaN(+idStr) ? undefined : +idStr;

    if (this.id != null) {
      const question = this.questionService.getSingle(this.id);
      if (question) {
        this.selectedTypeId = question.type;
      } else {
        this.router.navigate(['404']);
      }
    }

    this.loadFormComponent();
  }
}
