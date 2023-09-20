import { MultipleChoicesFormComponent } from '../../components/multiple-choices-form/multiple-choices-form.component';
import { OpenQuestionFormComponent } from '../../components/open-question-form/open-question-form.component';
import { SingleChoiceQuestionFormComponent } from '../../components/single-choice-question-form/single-choice-question-form.component';

export const QUESTION_TYPE = {
  SINGLE_CHOICE: {
    id: 'SINGLE_CHOICE',
    label: 'Single choice',
    formComponent: SingleChoiceQuestionFormComponent,
  },
  MULTIPLE_CHOICES: {
    id: 'MULTIPLE_CHOICES',
    label: 'Multiple choices',
    formComponent: MultipleChoicesFormComponent,
  },
  OPEN: {
    id: 'OPEN',
    label: 'Open',
    formComponent: OpenQuestionFormComponent,
  },
} as const;

export const QUESTION_TYPES = Object.values(QUESTION_TYPE);
