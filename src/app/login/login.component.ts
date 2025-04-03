import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

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
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    const request = this.loginForm.getRawValue();
    this.fetching = true;
    this.authService.login(request)
      .pipe(finalize(() => (this.fetching = false)))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/my-posts');
        },
        error: error => this.errorMessage = error?.error?.message ?? error?.statusText ?? 'Error while login'
      });
  }
}
