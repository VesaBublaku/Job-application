import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { AuthService} from '../auth/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  userType: string = 'employer';
  loading = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.loading = true;
    this.errorMessage = "";

    const url = this.userType === "employer"
      ? "http://localhost:8080/auth/login/employer"
      : "http://localhost:8080/auth/login/worker";

    this.http.post(url, { email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        this.loading = false;

        this.authService.setUser({ ...response, role: this.userType });

        if (this.userType === "employer") {
          localStorage.setItem('employerId', response.id.toString());
        } else {
          localStorage.setItem('workerId', response.id.toString());
        }

        this.router.navigate([
          this.userType === "employer" ? '/employer-profile' : '/worker-profile'
        ]);
      }
    });
  }

}
