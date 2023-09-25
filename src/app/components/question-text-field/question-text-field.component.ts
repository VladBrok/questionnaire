import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-text-field',
  templateUrl: './question-text-field.component.html',
  styleUrls: ['./question-text-field.component.scss'],
})
export class QuestionTextFieldComponent implements OnChanges {
  @Input() form!: FormGroup<any>;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges() {
    this.ref.detectChanges();
  }
}
