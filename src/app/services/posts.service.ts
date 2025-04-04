import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostsList } from '../interface/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly api = 'https://dummyjson.com/posts';

  constructor(private readonly http: HttpClient) { }

  getPosts(): Observable<PostsList> {
    return this.http.get<PostsList>(this.api);
  }

  getUserPosts(userId: number): Observable<PostsList> {
    return this.http.get<PostsList>(`${this.api}/user/${userId}`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.api}/${id}`);
  }
}
