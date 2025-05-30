import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'env/environment';
import { User, UserList } from 'app/interfaces';
import { getAPIContext } from 'app/interceptors';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiRoot}/users`;
  private readonly http = inject(HttpClient);

  filterUsers(key: keyof User, value: string): Observable<UserList> {
    const params = new HttpParams({
      fromObject: {
        key,
        value
      }
    });

    return this.http.get<UserList>(`${this.apiUrl}/filter`, {
      context: getAPIContext('Error while getting users'),
      params
    });
  }

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
