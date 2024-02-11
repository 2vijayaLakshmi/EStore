import { user } from './../../../types/user.type';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../../../services/category/users/user-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: [''],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchPasswords,
      }
    );
  }

  get firstname(): AbstractControl | null {
    return this.userSignupForm.get('firstname');
  }
  get email(): AbstractControl | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void {
    const user: user = {
      firstname: this.firstname?.value,
      lastname: this.userSignupForm.get('lastname')?.value,
      address: this.userSignupForm.get('address')?.value,
      city: this.userSignupForm.get('city')?.value,
      state: this.userSignupForm.get('state')?.value,
      pin: this.userSignupForm.get('pin')?.value,
      email: this.email?.value,
      password: this.password?.value,
    };

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'Success') {
          this.alertMessage = 'User created successfully';
          this.alertType = 0;
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      },
    });
  }
}
