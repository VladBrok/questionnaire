import {
  AfterContentInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { QuestionService } from '../../core/services/question-service/question.service';
import { Question } from '../../core/models/Question';
import { QuestionDirective } from '../../core/directives/question.directive';
import { QUESTION_TYPES } from '../../core/config/QuestionType';
import { QuestionCard } from '../../core/models/QuestionCard';

@Component({
  selector: 'app-question-lists-page',
  templateUrl: './question-lists-page.component.html',
  styleUrls: ['./question-lists-page.component.scss'],
})
export class QuestionListsPageComponent implements OnInit {
  questions: Question[] = [];
  types = QUESTION_TYPES;

  constructor(private readonly questionService: QuestionService) {}

  @ViewChildren(QuestionDirective) questionCards!: QueryList<QuestionDirective>;

  ngOnInit(): void {
    this.initQuestions();
    setTimeout(() => {
      this.loadCardComponents();
    });
  }

  initQuestions() {
    this.questions = this.questionService.getAll();
  }

  loadCardComponents() {
    const answered = this.answeredQuestions;
    const unanswered = this.unansweredQuestions;

    this.questionCards?.forEach((card, index) => {
      const viewContainerRef = card.viewContainerRef;
      viewContainerRef.clear();

      const adjustedIndex = index % unanswered.length;
      const question =
        index >= unanswered.length
          ? answered[adjustedIndex]
          : unanswered[index];

      const cardComponent = this.types.find(
        (x) => x.id === question.type
      )?.cardComponent;

      if (!cardComponent) {
        console.error(
          `cardComponent for question type id ${question.type} was not found. Check question types`
        );
        return;
      }

      const componentRef =
        viewContainerRef.createComponent<QuestionCard>(cardComponent);
      componentRef.instance.id = question.id;
    });
  }

  get answeredQuestions() {
    return this.questions.filter((x) => x.isAnswered);
  }

  get unansweredQuestions() {
    return this.questions.filter((x) => !x.isAnswered);
  }
}
