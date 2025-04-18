import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { PostsList } from 'app/interfaces';
import { AuthService, PostsService } from 'app/services';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, AsyncPipe]
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
    this.title = (this.route.snapshot.routeConfig?.title as string) ?? 'Posts';
    this.postsList$ = (this.route.snapshot.data?.['showUserPosts'] && this.authService.userId)
      ? this.postsService.getUserPosts(this.authService.userId)
      : this.postsService.getPosts();
  }
}
