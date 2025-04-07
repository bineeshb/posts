import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';

import { User } from 'app/interfaces';
import { AuthService, UserService } from 'app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy, OnInit {
  private subs$: Subscription[] = [];

  details: User | null = null;
  detailsForm: FormGroup;
  saving = false;
  showEditForm = false;

  constructor(
    private readonly authService: AuthService,
    fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.detailsForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs$.push(this.userService.getUser(this.authService.userId as number).subscribe({
      next: details => this.details = details,
      error: error => console.error('Error while getting user details', error)
    }));
  }

  editDetails(): void {
    const details = this.details as User;
    this.detailsForm.setValue({
      firstName: details.firstName,
      lastName: details.lastName,
      birthDate: details.birthDate,
      gender: details.gender,
      age: details.age,
      email: details.email,
      phone: details.phone,
      username: details.username,
      password: details.password
    });
    this.showEditForm = true;
  }

  cancelEdit(): void {
    this.showEditForm = false;
  }

  saveDetails(): void {
    const formValues = this.detailsForm.getRawValue();
    this.detailsForm.disable();
    this.saving = true;
    this.subs$.push(this.userService.updateUser(this.authService.userId as number, formValues)
      .pipe(finalize(() => {
        this.detailsForm.enable();
        this.saving = false;
      }))
      .subscribe({
        next: updatedDetails => {
          this.details = { ...updatedDetails, ...formValues };
          this.showEditForm = false;
        },
        error: error => console.error('Error while saving user details', error)
      }));
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
