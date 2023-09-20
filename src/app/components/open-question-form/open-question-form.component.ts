import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../../core/services/question-service/question.service';
import { OpenQuestion } from '../../core/models/OpenQuestion';

@Component({
  selector: 'app-open-question-form',
  templateUrl: './open-question-form.component.html',
  styleUrls: ['./open-question-form.component.scss'],
})
export class OpenQuestionFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    questionText: [null, Validators.compose([Validators.required])],
  });

  constructor(private readonly questionService: QuestionService) {}

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const question: Omit<OpenQuestion, 'id'> = {
      text: this.form.value.questionText || '',
      type: 'OPEN',
      answer: '',
    };

    this.questionService.add(question);
  }
}
