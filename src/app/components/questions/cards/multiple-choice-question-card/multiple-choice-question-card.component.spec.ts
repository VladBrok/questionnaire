import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionCardComponent } from './multiple-choice-question-card.component';

describe('MultipleChoiceQuestionCardComponent', () => {
  let component: MultipleChoiceQuestionCardComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleChoiceQuestionCardComponent]
    });
    fixture = TestBed.createComponent(MultipleChoiceQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
