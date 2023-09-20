import { Question } from './Question';

export interface SingleChoiceQuestion extends Question {
  options: string[];
  answerOptionIdx: number;
}
