import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTextFieldComponent } from './question-text-field.component';

describe('QuestionTextFieldComponent', () => {
  let component: QuestionTextFieldComponent;
  let fixture: ComponentFixture<QuestionTextFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTextFieldComponent]
    });
    fixture = TestBed.createComponent(QuestionTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
