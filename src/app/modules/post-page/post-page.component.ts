
import { Component, Input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, take, takeUntil } from 'rxjs';

import { Post } from 'app/interfaces';
import { Unsub } from 'app/models/unsub.model';
import { PostsService } from 'app/services';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss'],
    imports: [RouterLink]
})
export class PostPageComponent extends Unsub implements OnInit {
  @Input() postId?: string;

  details = signal<Post | null>(null);
  backPageTitle = signal('Posts');
  backLink = signal('');

  constructor(
    private readonly postsService: PostsService,
    router: Router,
    private readonly ngTitle: Title
  ) {
    super();
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      const state = router.getCurrentNavigation()?.extras.state;
      this.backPageTitle.set(state?.['backPageTitle'] ?? 'Posts');
      this.backLink.set(state?.['backLink'] ?? '/');
    });
  }

  ngOnInit(): void {
    const postId = Number(this.postId ?? 0);

    if (!isNaN(postId)) {
      this.postsService.getPost(postId).pipe(take(1)).subscribe(postDetails => {
        this.details.set(postDetails);
        this.ngTitle.setTitle(postDetails.title);
      });
    }
  }
}
