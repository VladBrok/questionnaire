import { MultipleChoiceQuestionCardComponent } from '../../components/questions/cards/multiple-choice-question-card/multiple-choice-question-card.component';
import { MultipleChoicesFormComponent } from '../../components/questions/forms/multiple-choices-form/multiple-choices-form.component';
import { OpenQuestionCardComponent } from '../../components/questions/cards/open-question-card/open-question-card.component';
import { OpenQuestionFormComponent } from '../../components/questions/forms/open-question-form/open-question-form.component';
import { SingleChoiceQuestionCardComponent } from '../../components/questions/cards/single-choice-question-card/single-choice-question-card.component';
import { SingleChoiceQuestionFormComponent } from '../../components/questions/forms/single-choice-question-form/single-choice-question-form.component';

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
    cardComponent: MultipleChoiceQuestionCardComponent,
  },
  OPEN: {
    id: 'OPEN',
    label: 'Open',
    formComponent: OpenQuestionFormComponent,
    cardComponent: OpenQuestionCardComponent,
  },
} as const;

export const QUESTION_TYPES = Object.values(QUESTION_TYPE);
