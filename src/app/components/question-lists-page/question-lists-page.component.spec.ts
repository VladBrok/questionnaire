import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListsPageComponent } from './question-lists-page.component';

describe('QuestionListsPageComponent', () => {
  let component: QuestionListsPageComponent;
  let fixture: ComponentFixture<QuestionListsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionListsPageComponent]
    });
    fixture = TestBed.createComponent(QuestionListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
