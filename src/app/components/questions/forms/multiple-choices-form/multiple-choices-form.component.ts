import { Component, Input, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { QuestionService } from '../../../../core/services/question-service/question.service';
import { MultipleChoicesQuestion } from '../../../../core/models/MultipleChoicesQuestion';
import { Router } from '@angular/router';
import { QuestionPatch } from '../../../../core/models/QuestionPatch';
import { QuestionForm } from '../../../../core/models/QuestionForm';

@Component({
  selector: 'app-multiple-choices-form',
  templateUrl: './multiple-choices-form.component.html',
  styleUrls: ['./multiple-choices-form.component.scss'],
})
export class MultipleChoicesFormComponent implements QuestionForm, OnInit {
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

  @Input() id?: number;

  constructor(
    private readonly questionService: QuestionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.prefillForm();
  }

  private prefillForm() {
    if (this.id == null) {
      return;
    }

    const question = this.questionService.getSingle(
      this.id,
      'MULTIPLE_CHOICES'
    ) as MultipleChoicesQuestion;

    if (!question) {
      return;
    }

    this.form.patchValue({
      questionText: question.text as any,
    });
    for (let i = 0; i < question.options.length; i++) {
      this.addOption(question.options[i]);
    }
  }

  private get options() {
    return this.form.get('options') as FormArray;
  }

  addOption(option?: string): void {
    this.options.push(this.fb.control(option || '', Validators.required));
  }

  deleteOption(index: number): void {
    this.options.removeAt(index);
  }

  onSubmit(): void {
    this.isShowErrors = true;

    if (!this.form.valid) {
      return;
    }

    const question: QuestionPatch<MultipleChoicesQuestion> = {
      text: this.form.value.questionText || '',
      type: 'MULTIPLE_CHOICES',
      options: (this.form.value.options as string[]) || [],
    };

    if (this.id == null) {
      this.questionService.add(question);
    } else {
      this.questionService.update(this.id, question);
    }

    this.router.navigate(['/manage']);
  }
}
