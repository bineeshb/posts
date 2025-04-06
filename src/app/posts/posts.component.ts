import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PostsList } from '../interface/post';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsList$: Observable<PostsList> | null = null;
  routeUrl = '';
  title = 'Posts';

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
    this.postsList$ = (routeData?.['showUserPosts'] && this.authService.userId)
      ? this.postsService.getUserPosts(this.authService.userId)
      : this.postsService.getPosts();
  }
}
