import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isSignup: boolean = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator.bind(this),
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  toggleShow() {
    this.isSignup = !this.isSignup;
    this.signInForm.reset();
    this.signUpForm.reset();
    this.showPassword = false;
  }

  clearUsername() {
    if (this.isSignup) {
      this.signUpForm.get('username')!.setValue('');
    } else {
      this.signInForm.get('username')!.setValue('');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isSignup) {
      const { confirmPassword, ...userData } = this.signUpForm.value;
      this.userService.registerUser(userData).subscribe(
        (response) => {
          this.userService.handleRegisterResponse(response);
          console.log('User registered successfully:', response);
          // Optionally, you can redirect to a login page or perform other actions
        },
        (error) => {
          this.userService.handleRegisterError(error);
          console.error('Error registering user:', error);
        }
      );
    } else {
      const userData = this.signInForm.value;
      this.userService.loginUser(userData).subscribe(
        (response) => {},
        (error) => {
          this.userService.handleLoginError(error);
        }
      );
    }
  }
}
