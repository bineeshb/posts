import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';

import { Unsub } from './models/unsub.model';
import { AuthService } from './services/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Unsub {
  title = 'posts';

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ngTitle: Title
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        const child: ActivatedRoute | null = this.route.firstChild;
        return child?.snapshot?.data?.['title'] ?? null;
      }),
      filter(title => !!title),
      takeUntil(this.unsubscribe$)
    ).subscribe(title => {
      this.ngTitle.setTitle(title);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
