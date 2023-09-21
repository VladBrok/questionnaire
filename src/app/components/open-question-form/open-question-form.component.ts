import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../../core/services/question-service/question.service';
import { OpenQuestion } from '../../core/models/OpenQuestion';
import { Router } from '@angular/router';
import { QuestionPatch } from '../../core/models/QuestionPatch';
import { QuestionForm } from '../../core/models/QuestionForm';

@Component({
  selector: 'app-open-question-form',
  templateUrl: './open-question-form.component.html',
  styleUrls: ['./open-question-form.component.scss'],
})
export class OpenQuestionFormComponent implements QuestionForm, OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    questionText: [null, Validators.compose([Validators.required])],
  });

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
      'OPEN'
    ) as OpenQuestion;

    if (!question) {
      return;
    }

    this.form.patchValue({
      questionText: question.text as any,
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const question: QuestionPatch<OpenQuestion> = {
      text: this.form.value.questionText || '',
      type: 'OPEN',
      answer: '',
    };

    if (this.id == null) {
      this.questionService.add(question);
    } else {
      this.questionService.update(this.id, question);
    }

    this.router.navigate(['/manage']);
  }
}
