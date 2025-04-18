import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'app/interfaces';
import { getAPIContext } from 'app/interceptors';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://dummyjson.com/users';
  private readonly http = inject(HttpClient);

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, {
      context: getAPIContext('Error while getting user details')
    });
  }

  updateUser(userId: number, request: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, request, {
      context: getAPIContext('Error while updating user details')
    });
  }
}
