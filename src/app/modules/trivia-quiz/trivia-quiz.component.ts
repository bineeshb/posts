import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';

import { TriviaQuestion } from 'app/interfaces';
import { TriviaService } from 'app/services/trivia.service';

interface ViewTriviaQuestion extends TriviaQuestion {
  id: string;
  options: string[];
}

@Component({
  selector: 'app-trivia-quiz',
  imports: [AsyncPipe],
  templateUrl: './trivia-quiz.component.html',
  styleUrl: './trivia-quiz.component.scss'
})
export class TriviaQuizComponent implements OnInit {

  triviaList$: Observable<ViewTriviaQuestion[]> = of([]);

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly triviaService: TriviaService
  ) {}

  ngOnInit(): void {
    this.triviaList$ = this.triviaService.getQuestions().pipe(
      map(
        response => response?.results?.length
          ? response.results.map(this.getViewQuestion.bind(this))
          : []
      )
    );
  }

  private getSafeHTML(html: string): string {
    return this.domSanitizer.bypassSecurityTrustHtml(html) as string;
  }

  private getViewQuestion(trivia: TriviaQuestion, index: number): ViewTriviaQuestion {
    return {
      ...trivia,
      id: `q${index}`,
      question: this.getSafeHTML(trivia.question),
      options: [ trivia.correct_answer, ...trivia.incorrect_answers ].map(this.getSafeHTML.bind(this)).sort()
    };
  }
}
