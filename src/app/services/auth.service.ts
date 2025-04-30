import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginUser, LoggedInUser } from 'app/interfaces';
import { getAPIContext } from 'app/interceptors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = 'https://dummyjson.com/auth';
  private readonly http = inject(HttpClient);
  private readonly loggedInUser = signal<LoggedInUser | null>(null);
  user = this.loggedInUser.asReadonly();
  userId = computed(() => this.user()?.id ?? null);

  login(request: LoginUser): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`${this.api}/login`, request, { context: getAPIContext('Error while login', false) })
      .pipe(
        tap(user => this.loggedInUser.set(user))
      );
  }

  logout(): void {
    this.loggedInUser.set(null);
  }
}
