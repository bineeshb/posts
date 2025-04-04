import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../interface';
import { AuthService, UserService } from '../services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy, OnInit {
  private subs$: Subscription[] = [];

  details: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.subs$.push(this.userService.getUser(this.authService.userId as number).subscribe(userDetails => this.details = userDetails));
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
