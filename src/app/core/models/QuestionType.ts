export const QUESTION_TYPE = {
  SINGLE_CHOICE: {
    id: 'SINGLE_CHOICE',
    label: 'Single choice',
  },
  MULTIPLE_CHOICES: {
    id: 'MULTIPLE_CHOICES',
    label: 'Multiple choices',
  },
  OPEN: {
    id: 'OPEN',
    label: 'Open',
  },
} as const;

export const QUESTION_TYPES = Object.values(QUESTION_TYPE);
