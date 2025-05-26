import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TriviaResults } from 'app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private readonly api = 'https://opentdb.com/api.php?amount=10';
  private readonly http = inject(HttpClient);

  getQuestions(): Observable<TriviaResults> {
    return this.http.get<TriviaResults>(this.api);
  }
}
