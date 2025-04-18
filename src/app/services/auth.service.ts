import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginUser, LoggedInUser } from 'app/interfaces';
import { getAPIContext } from 'app/interceptors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = 'https://dummyjson.com/auth';
  private readonly http = inject(HttpClient);
  user: LoggedInUser | null = null;

  login(request: LoginUser): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`${this.api}/login`, request, { context: getAPIContext('Error while login', false) })
      .pipe(
        tap(user => this.user = user)
      );
  }

  logout(): void {
    this.user = null;
  }

  get userId(): number | null {
    return this.user?.id ?? null;
  }
}
