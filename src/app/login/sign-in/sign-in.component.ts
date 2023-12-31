import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent{

  isSignup: boolean = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder){
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
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
      console.log(this.signUpForm.value);
    } else {
      console.log(this.signInForm.value);
    }
  }

}
