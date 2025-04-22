
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize, take } from 'rxjs';

import { User } from 'app/interfaces';
import { AuthService, UserService } from 'app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class UserProfileComponent implements OnInit {
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
    this.userService.getUser(this.authService.userId as number).pipe(take(1))
      .subscribe(details => this.details = details);
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
    this.userService.updateUser(this.authService.userId as number, formValues)
      .pipe(
        finalize(() => {
          this.detailsForm.enable();
          this.saving = false;
        }),
        take(1)
      )
      .subscribe(updatedDetails => {
        this.details = { ...updatedDetails, ...formValues };
        this.showEditForm = false;
      });
  }
}
