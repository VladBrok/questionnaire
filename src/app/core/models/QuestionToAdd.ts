import { Question } from './Question';

export type QuestionToAdd<T extends Question> = Omit<
  T,
  'id' | 'isAnswered' | 'createdAt'
>;
