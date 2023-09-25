import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-text-field',
  templateUrl: './question-text-field.component.html',
  styleUrls: ['./question-text-field.component.scss'],
})
export class QuestionTextFieldComponent {
  @Input() form!: FormGroup<any>;
}
