// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your actual backend API URL

  constructor(private http: HttpClient,private toastr: ToastrService) {}

  registerUser(user: any): Observable<any> {
    // Assuming your backend endpoint for user registration is '/register'
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => this.handleLoginResponse(response))
      );
  }

  handleRegisterResponse(response: any) {
    this.toastr.success('User registered successfully!', 'Success');
    // Additional logic if needed
  }

  handleRegisterError(error: any) {
    if (error.status === 400) {
      this.toastr.error('Username is already taken. Please choose another one.', 'Error',{progressBar:true});
    } else {
      this.toastr.error('Error registering user. Please try again later.', 'Error',{progressBar:true});
    }
  }

  handleLoginResponse(response: any) {
    if (response && response.token) {
      // Store the token in local storage or a secure storage mechanism
      localStorage.setItem('authToken', response.token);

      // Display success message using Toastr
      this.toastr.success('Login successful!', 'Success',{progressBar:true});
    } else {
      // Display an error message if the response does not contain a token
      this.toastr.error('Invalid response from the server. Please try again.', 'Error',{progressBar:true});
    }
  }

  handleLoginError(error: any) {
    if (error.status === 401) {
      this.toastr.error('Invalid username or password. Please try again.', 'Error',{progressBar:true});
    } else {
      this.toastr.error('Error logging in. Please try again later.', 'Error',{progressBar:true});
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.toastr.success('Logged out successfully!', 'Success',{progressBar:true});
  }

  // You can add more methods for other user-related operations, e.g., updateProfile, logout, etc.
}
