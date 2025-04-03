import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../interface/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private subs$: Subscription[] = [];

  posts: Post[] = [];
  totalPosts = 0;

  constructor(private readonly postsService: PostsService) { }

  ngOnInit(): void {
    this.subs$.push(this.postsService.getPosts().subscribe(postsList => {
      this.posts = postsList?.posts ?? [];
      this.totalPosts = postsList?.total ?? 0;
    }));
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.subs$ = [];
  }
}
