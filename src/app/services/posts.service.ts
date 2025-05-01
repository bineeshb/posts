import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'env/environment';
import { Post, PostsList } from 'app/interfaces';
import { getAPIContext } from 'app/interceptors';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly api = `${environment.apiRoot}/posts`;
  private readonly http = inject(HttpClient);

  getPosts(): Observable<PostsList> {
    return this.http.get<PostsList>(this.api, {
      context: getAPIContext('Error while fetching posts')
    });
  }

  getUserPosts(userId: number): Observable<PostsList> {
    return this.http.get<PostsList>(`${this.api}/user/${userId}`, {
      context: getAPIContext('Error while fetching user posts')
    });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.api}/${id}`, {
      context: getAPIContext('Error while fetching post details')
    });
  }
}
