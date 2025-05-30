import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';

import { AuthService } from 'app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  errorMessage = signal<string | null>(null);
  loginForm: FormGroup;
  fetching = signal(false);

  constructor(
    private readonly authService: AuthService,
    fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    const request = this.loginForm.getRawValue();
    this.loginForm.disable();
    this.fetching.set(true);
    this.errorMessage.set(null);
    this.authService.login(request)
      .pipe(
        finalize(() => {
          this.loginForm.enable();
          this.fetching.set(false);
        }),
        take(1)
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/my-posts');
        },
        error: (error: Error) => this.errorMessage.set(error.message)
      });
  }
}
