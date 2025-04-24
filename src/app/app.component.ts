import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterOutlet, ToastComponent]
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
