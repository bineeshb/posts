import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';

import { TriviaQuestion } from 'app/interfaces';
import { TriviaService } from 'app/services/trivia.service';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { SelectOptionComponent } from './select-option/select-option.component';

type ControlComponent = Type<RadioGroupComponent | SelectOptionComponent>;

export interface ViewTriviaQuestion extends TriviaQuestion {
  id: string;
  sanitizedQuestion: SafeHtml;
  options: string[];
  sanitizedOptions: SafeHtml[];
  controlComponent: ControlComponent;
  controlRef: FormControl
}

@Component({
  selector: 'app-trivia-quiz',
  imports: [
    AsyncPipe,
    NgComponentOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './trivia-quiz.component.html',
  styleUrl: './trivia-quiz.component.scss'
})
export class TriviaQuizComponent implements OnInit {

  triviaList$: Observable<ViewTriviaQuestion[]> = of([]);
  triviaForm!: FormGroup;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly fb: FormBuilder,
    private readonly triviaService: TriviaService
  ) {}

  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      userAnswers: this.fb.array([])
    });
    this.triviaList$ = this.triviaService.getQuestions().pipe(
      map(
        response => response?.results?.length
          ? response.results.map(this.getViewQuestion.bind(this))
          : []
      )
    );
  }

  validateAnswers(): void {
    console.log('formValues', this.triviaForm.valid, this.triviaForm.getRawValue());
  }

  getControlComponent(type: string): ControlComponent {
    const optionsComponents = [RadioGroupComponent, SelectOptionComponent];

    if (type === 'boolean') {
      return RadioGroupComponent;
    } else {
      return optionsComponents[Math.floor(Math.random() * optionsComponents.length)];
    }
  }

  resetForm(): void {
    this.triviaForm.reset();
  }

  get userAnswers(): FormArray {
    return this.triviaForm.get('userAnswers') as FormArray;
  }

  private getSafeHTML(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  private getViewQuestion(trivia: TriviaQuestion, index: number): ViewTriviaQuestion {
    const controlRef = this.fb.control(null, { validators: Validators.required });
    this.userAnswers.push(controlRef);

    const options = [ trivia.correct_answer, ...trivia.incorrect_answers ].sort();

    return {
      ...trivia,
      id: `q${index}`,
      sanitizedQuestion: this.getSafeHTML(trivia.question),
      options,
      sanitizedOptions: options.map(this.getSafeHTML.bind(this)),
      controlComponent: this.getControlComponent(trivia.type),
      controlRef
    };
  }
}
