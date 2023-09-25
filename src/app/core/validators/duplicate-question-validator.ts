import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionService } from '../services/question-service/question.service';

export function duplicateQuestionValidator(): ValidatorFn {
  const questionService = inject(QuestionService);

  return (control: AbstractControl): ValidationErrors | null => {
    const questionText = control.value as string | undefined;
    const questions = questionService.getAll();
    const isDup = questions.find((x) => x.text.trim() === questionText?.trim());
    return isDup ? { duplicateQuestion: true } : null;
  };
}
