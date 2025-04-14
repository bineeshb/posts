import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private readonly router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
