import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, take, takeUntil } from 'rxjs';

import { Post } from 'app/interfaces';
import { Unsub } from 'app/models/unsub.model';
import { PostsService } from 'app/services';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent extends Unsub implements OnInit {
  details: Post | null = null;
  backPageTitle = 'Posts';
  backLink = ''

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    router: Router,
    private readonly ngTitle: Title
  ) {
    super();
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      const state = router.getCurrentNavigation()?.extras.state;
      this.backPageTitle = state?.['backPageTitle'] ?? 'Posts';
      this.backLink = state?.['backLink'] ?? '/';
    });
  }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('postId') ?? 0);

    if (!isNaN(postId)) {
      this.postsService.getPost(postId).pipe(take(1)).subscribe(postDetails => {
        this.details = postDetails;
        this.ngTitle.setTitle(postDetails.title);
      });
    }
  }
}
