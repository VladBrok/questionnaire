import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionFormComponent } from './single-choice-question-form.component';

describe('SingleChoiceQuestionFormComponent', () => {
  let component: SingleChoiceQuestionFormComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleChoiceQuestionFormComponent]
    });
    fixture = TestBed.createComponent(SingleChoiceQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
