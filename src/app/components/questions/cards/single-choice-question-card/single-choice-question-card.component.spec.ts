import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionCardComponent } from './single-choice-question-card.component';

describe('SingleChoiceQuestionCardComponent', () => {
  let component: SingleChoiceQuestionCardComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleChoiceQuestionCardComponent]
    });
    fixture = TestBed.createComponent(SingleChoiceQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
