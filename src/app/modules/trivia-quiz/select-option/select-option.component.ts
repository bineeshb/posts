import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewTriviaQuestion } from '../trivia-quiz.component';

@Component({
  selector: 'app-select-option',
  imports: [ReactiveFormsModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent {
  trivia = input.required<ViewTriviaQuestion>();
}
