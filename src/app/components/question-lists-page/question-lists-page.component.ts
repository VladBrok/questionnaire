import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { QuestionService } from '../../core/services/question-service/question.service';
import { Question } from '../../core/models/Question';
import { QuestionDirective } from '../../core/directives/question.directive';
import { QUESTION_TYPES } from '../../core/config/QuestionType';
import { QuestionCard } from '../../core/models/QuestionCard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-lists-page',
  templateUrl: './question-lists-page.component.html',
  styleUrls: ['./question-lists-page.component.scss'],
})
export class QuestionListsPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  types = QUESTION_TYPES;
  private readonly subscription = new Subscription();

  constructor(private readonly questionService: QuestionService) {}

  @ViewChildren(QuestionDirective) questionCards!: QueryList<QuestionDirective>;

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init() {
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
      // TODO: this is bad:
      // we are subscribing to the child's `change` event and when it's fired, rerendering everything to display updated questions
      // because child updates `question` using `questionService` which uses `localStorage` but we don't know about that and still have old questions.
      // NgRx should be used instead of this `change` event.
      const sub = componentRef.instance.change.subscribe(() => this.init());
      this.subscription.add(sub);
    });
  }

  get answeredQuestions() {
    return this.questions.filter((x) => x.isAnswered);
  }

  get unansweredQuestions() {
    return this.questions.filter((x) => !x.isAnswered);
  }
}
