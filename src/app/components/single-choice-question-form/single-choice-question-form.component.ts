import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../../core/services/question-service/question.service';
import { SingleChoiceQuestion } from '../../core/models/SingleChoiceQuestion';
import { Router } from '@angular/router';
import { QuestionToAdd } from '../../core/models/QuestionToAdd';

@Component({
  selector: 'app-single-choice-question-form',
  templateUrl: './single-choice-question-form.component.html',
  styleUrls: ['./single-choice-question-form.component.scss'],
})
export class SingleChoiceQuestionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    questionText: [null, Validators.compose([Validators.required])],
    answerOptionIdx: [0],
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

  private get options() {
    return this.form.get('options') as FormArray;
  }

  ngOnInit(): void {
    this.prefillForm();
  }

  private prefillForm() {
    if (this.id == null) {
      return;
    }

    const question = this.questionService.getSingle(
      this.id
    ) as SingleChoiceQuestion;

    if (!question) {
      return;
    }

    this.form.patchValue({
      questionText: question.text as any,
      answerOptionIdx: question.answerOptionIdx,
    });
    for (const option of question.options) {
      this.addOption(option);
    }
  }

  addOption(text?: string): void {
    this.options.push(this.fb.control(text || '', Validators.required));
  }

  deleteOption(index: number): void {
    this.options.removeAt(index);
  }

  onSubmit(): void {
    this.isShowErrors = true;

    if (!this.form.valid) {
      return;
    }

    const question: QuestionToAdd<SingleChoiceQuestion> = {
      text: this.form.value.questionText || '',
      type: 'SINGLE_CHOICE',
      options: (this.form.value.options as string[]) || [],
      answerOptionIdx: this.form.value.answerOptionIdx || 0,
    };

    this.questionService.add(question);
    this.router.navigate(['/manage']);
  }
}
