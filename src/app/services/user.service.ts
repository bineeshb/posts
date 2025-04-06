import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://dummyjson.com/users';

  constructor(private readonly http: HttpClient) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, request: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, request);
  }
}
