import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  userType: string = 'employer';
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.loading = true;
    this.errorMessage = "";

    let url = this.userType === "employer"
      ? "http://localhost:8080/auth/login/employer"
      : "http://localhost:8080/auth/login/worker";

    this.http.post(url, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        this.loading = false;
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("role", this.userType);

        this.router.navigate([this.userType === "employer"
          ? '/employer-dashboard'
          : '/worker-dashboard']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Invalid email or password";
      }
    });
  }
}
