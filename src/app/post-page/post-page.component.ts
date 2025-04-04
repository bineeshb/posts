import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, Subscription } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { Post } from '../interface/post';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnDestroy, OnInit {
  private subs$: Subscription[] = [];

  details: Post | null = null;
  backPageTitle = 'Posts';
  backLink = ''

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    router: Router,
    private readonly ngTitle: Title
  ) {
    this.subs$.push(router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      const state = router.getCurrentNavigation()?.extras.state;
      this.backPageTitle = state?.['backPageTitle'];
      this.backLink = state?.['backLink'];
    }));
  }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('postId') ?? 0);
    this.ngTitle.setTitle('Post');

    if (!isNaN(postId)) {
      this.subs$.push(this.postsService.getPost(postId).subscribe(postDetails => {
        this.details = postDetails;
        this.ngTitle.setTitle(postDetails.title);
      }));
    }
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
