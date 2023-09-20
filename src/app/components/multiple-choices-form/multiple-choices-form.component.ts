import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { QuestionService } from '../../core/services/question-service/question.service';
import { MultipleChoicesQuestion } from '../../core/models/MultipleChoicesQuestion';

@Component({
  selector: 'app-multiple-choices-form',
  templateUrl: './multiple-choices-form.component.html',
  styleUrls: ['./multiple-choices-form.component.scss'],
})
export class MultipleChoicesFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    questionText: [null, Validators.compose([Validators.required])],
    answers: this.fb.array([], Validators.compose([this.answersValidator()])),
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

  constructor(private readonly questionService: QuestionService) {}

  answersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.some((x: boolean) => x)
        ? null
        : { answerNotSelected: true };
    };
  }

  private get options() {
    return this.form.get('options') as FormArray;
  }

  private get answers() {
    return this.form.get('answers') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
    this.answers.push(this.fb.control(false));
  }

  deleteOption(index: number): void {
    this.options.removeAt(index);
    this.answers.removeAt(index);
  }

  onSubmit(): void {
    this.isShowErrors = true;

    if (!this.form.valid) {
      return;
    }

    const question: Omit<MultipleChoicesQuestion, 'id'> = {
      text: this.form.value.questionText || '',
      type: 'MULTIPLE_CHOICES',
      options: (this.form.value.options as string[]) || [],
      answers: (this.form.value.answers as boolean[]) || [],
    };

    this.questionService.add(question);
  }
}
