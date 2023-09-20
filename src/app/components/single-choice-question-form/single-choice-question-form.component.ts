import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-choice-question-form',
  templateUrl: './single-choice-question-form.component.html',
  styleUrls: ['./single-choice-question-form.component.scss'],
})
export class SingleChoiceQuestionFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    questionText: [null, Validators.compose([Validators.required])],
    options: this.fb.array(
      [],
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
      ])
    ),
  });
  isShowErrors = false;

  private get options() {
    return this.form.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
  }

  deleteOption(index: number): void {
    this.options.removeAt(index);
  }

  onSubmit(): void {
    this.isShowErrors = true;

    if (!this.form.valid) {
      return;
    }

    console.log('SingleChoiceQuestionFormComponent.onSubmit', this.form.value);
  }
}
