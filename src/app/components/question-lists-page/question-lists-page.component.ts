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
  private subscription = new Subscription();

  constructor(private readonly questionService: QuestionService) {}

  @ViewChildren(QuestionDirective) questionCards!: QueryList<QuestionDirective>;

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadQuestions() {
    this.questions = this.questionService.getAll();
    setTimeout(() => {
      this.loadCardComponents();
    });
  }

  loadCardComponents() {
    const answered = this.answeredQuestions;
    const unanswered = this.unansweredQuestions;

    let curIndex = 0;
    let curQuestions = unanswered;

    for (let index = 0; index < this.questionCards?.length; index++) {
      const card = this.questionCards.get(index)!;
      const viewContainerRef = card.viewContainerRef;
      viewContainerRef.clear();

      if (curIndex >= curQuestions.length) {
        curQuestions = answered;
        curIndex = 0;
      }
      const question = curQuestions[curIndex];
      curIndex++;

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
      const sub = componentRef.instance.change.subscribe(() => {
        this.onChildChange();
      });
      this.subscription.add(sub);
    }
  }

  private onChildChange() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    this.loadQuestions();
  }

  get answeredQuestions() {
    return this.questionService.sort(
      this.questions.filter((x) => x.answeredAt),
      'answeredAt'
    );
  }

  get unansweredQuestions() {
    return this.questionService.sort(
      this.questions.filter((x) => !x.answeredAt),
      'createdAt'
    );
  }
}
