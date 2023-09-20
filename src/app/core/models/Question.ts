import { QUESTION_TYPE } from '../config/QuestionType';

export interface Question {
  id: number;
  text: string;
  type: keyof typeof QUESTION_TYPE;
  isAnswered: boolean;
}
