import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionPageComponent } from './edit-question-page.component';

describe('EditQuestionPageComponent', () => {
  let component: EditQuestionPageComponent;
  let fixture: ComponentFixture<EditQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQuestionPageComponent]
    });
    fixture = TestBed.createComponent(EditQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
