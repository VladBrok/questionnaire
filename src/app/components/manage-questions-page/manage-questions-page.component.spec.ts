import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionsPageComponent } from './manage-questions-page.component';

describe('ManageQuestionsPageComponent', () => {
  let component: ManageQuestionsPageComponent;
  let fixture: ComponentFixture<ManageQuestionsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageQuestionsPageComponent]
    });
    fixture = TestBed.createComponent(ManageQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
