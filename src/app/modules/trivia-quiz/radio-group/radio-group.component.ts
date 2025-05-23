import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewTriviaQuestion } from '../trivia-quiz.component';

@Component({
  selector: 'app-radio-group',
  imports: [ReactiveFormsModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent {
  trivia = input.required<ViewTriviaQuestion>();
}
