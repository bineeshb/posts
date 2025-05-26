export interface TriviaQuestion {
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'difficult';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResults {
  response_code: number;
  results: TriviaQuestion[];
}
