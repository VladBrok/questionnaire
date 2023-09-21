import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoicesFormComponent } from './multiple-choices-form.component';

describe('MultipleChoicesFormComponent', () => {
  let component: MultipleChoicesFormComponent;
  let fixture: ComponentFixture<MultipleChoicesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleChoicesFormComponent]
    });
    fixture = TestBed.createComponent(MultipleChoicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
