import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../interface/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  details: Post | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService
  ) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('postId') ?? 0);

    if (!isNaN(postId)) {
      this.postsService.getPost(postId).subscribe(postDetails => this.details = postDetails);
    }
  }

}
