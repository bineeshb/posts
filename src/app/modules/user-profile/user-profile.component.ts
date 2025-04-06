import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'app/interfaces';
import { AuthService, UserService } from 'app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  details$: Observable<User> | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.details$ = this.userService.getUser(this.authService.userId as number);
  }
}
