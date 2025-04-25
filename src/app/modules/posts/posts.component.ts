import { AsyncPipe } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { PostsList } from 'app/interfaces';
import { AuthService, PostsService } from 'app/services';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    imports: [AsyncPipe, RouterLink]
})
export class PostsComponent implements OnInit {
  showUserPosts = input(false, {
    transform: isUserPosts => isUserPosts ?? false
  });

  postsList$: Observable<PostsList> | null = null;
  routeUrl = '';
  title = signal('Posts');

  constructor(
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    router: Router
  ) {
    this.routeUrl = router.url;
  }

  ngOnInit(): void {
    this.title.set((this.route.snapshot.routeConfig?.title as string) ?? 'Posts');
    this.postsList$ = (this.showUserPosts() && this.authService.userId)
      ? this.postsService.getUserPosts(this.authService.userId)
      : this.postsService.getPosts();
  }
}
