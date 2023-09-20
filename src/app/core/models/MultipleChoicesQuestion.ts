import { Question } from './Question';

export interface MultipleChoicesQuestion extends Question {
  options: string[];
  answerOptionIndexes: number[];
}
