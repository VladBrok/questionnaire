import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenQuestionCardComponent } from './open-question-card.component';

describe('OpenQuestionCardComponent', () => {
  let component: OpenQuestionCardComponent;
  let fixture: ComponentFixture<OpenQuestionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenQuestionCardComponent]
    });
    fixture = TestBed.createComponent(OpenQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
