import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;
  loginForm: FormGroup;
  fetching = false;

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
    this.fetching = true;
    this.authService.login(request)
      .pipe(finalize(() => {
        this.loginForm.enable();
        this.fetching = false;
      }))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/my-posts');
        },
        error: error => this.errorMessage = error?.error?.message ?? error?.statusText ?? 'Error while login'
      });
  }
}
