import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private route$: Subscription | null = null;

  title = 'posts';

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ngTitle: Title
  ) {}

  ngOnInit(): void {
    this.route$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        const child: ActivatedRoute | null = this.route.firstChild;
        return child?.snapshot?.data?.['title'] ?? null;
      }),
      filter(title => !!title)
    ).subscribe(title => {
      this.ngTitle.setTitle(title);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    if (this.route$ && !this.route$.closed) {
      this.route$.unsubscribe();
    }
    this.route$ = null;
  }
}
