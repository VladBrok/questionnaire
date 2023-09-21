import { MultipleChoicesFormComponent } from '../../components/multiple-choices-form/multiple-choices-form.component';
import { OpenQuestionFormComponent } from '../../components/open-question-form/open-question-form.component';
import { SingleChoiceQuestionCardComponent } from '../../components/single-choice-question-card/single-choice-question-card.component';
import { SingleChoiceQuestionFormComponent } from '../../components/single-choice-question-form/single-choice-question-form.component';

// TODO: set different card components

export const QUESTION_TYPE = {
  SINGLE_CHOICE: {
    id: 'SINGLE_CHOICE',
    label: 'Single choice',
    formComponent: SingleChoiceQuestionFormComponent,
    cardComponent: SingleChoiceQuestionCardComponent,
  },
  MULTIPLE_CHOICES: {
    id: 'MULTIPLE_CHOICES',
    label: 'Multiple choices',
    formComponent: MultipleChoicesFormComponent,
    cardComponent: SingleChoiceQuestionCardComponent,
  },
  OPEN: {
    id: 'OPEN',
    label: 'Open',
    formComponent: OpenQuestionFormComponent,
    cardComponent: SingleChoiceQuestionCardComponent,
  },
} as const;

export const QUESTION_TYPES = Object.values(QUESTION_TYPE);
