import { Question } from './Question';

export type QuestionPatch<T extends Question> = Omit<
  T,
  'id' | 'isAnswered' | 'createdAt'
>;
