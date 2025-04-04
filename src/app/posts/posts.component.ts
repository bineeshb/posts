import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../interface/post';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private subs$: Subscription[] = [];

  posts: Post[] = [];
  routeUrl = '';
  title = 'Posts';
  totalPosts = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    router: Router
  ) {
    this.routeUrl = router.url;
  }

  ngOnInit(): void {
    const routeData = this.route.snapshot.data ?? null;
    this.title = routeData?.['title'] ?? 'Posts';

    if (routeData?.['showUserPosts'] && this.authService.userId) {
      this.fetchAndShowUserPosts(this.authService.userId);
    } else {
      this.fetchAndShowAllPosts();
    }
  }

  fetchAndShowUserPosts(userId: number): void {
    this.subs$.push(this.postsService.getUserPosts(userId).subscribe(postsList => {
      this.posts = postsList?.posts ?? [];
      this.totalPosts = postsList?.total ?? 0;
    }));
  }

  fetchAndShowAllPosts(): void {
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
