import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginUser, LoggedInUser } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = 'https://dummyjson.com/auth';
  user: LoggedInUser | null = null;

  constructor(private readonly http: HttpClient) { }

  login(request: LoginUser): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`${this.api}/login`, request)
      .pipe(
        tap(user => this.user = user)
      );
  }
}
