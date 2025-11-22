import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header";
import { FooterComponent } from "../footer/footer";
import { EmployerProfileService } from './employer-profile.service';
import { RouterLink } from '@angular/router';
import {AuthService} from '../auth/auth.service';


export interface Employer {
  id: number;
  companyName: string;
  companyLogo?: string;
  yearOfFounding?: string;
  aboutCompany?: string;
  email: string;
  location?: { id?: number; name?: string } | null;
  numberOfEmployees?: { id?: number; numberOfEmployees?: string } | null;
  industry?: { id?: number; name?: string } | null;
  employerType?: { id?: number; type?: string } | null;
  availability?: { id?: number; availability?: string } | null;
  experience?: { id?: number; experience?: string } | null;
  compensation?: { id?: number; compensation?: string } | null;
}

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.html',
  styleUrls: ['./employer-profile.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink]
})
export class EmployerProfile implements OnInit {
  employerId: number = 0;
  employer: Employer | null = null;

  constructor(private employerService: EmployerProfileService,
              private authService:AuthService) {}

  ngOnInit(): void {
    this.employer = this.authService.getUser();
  }

  loadEmployer(): void {
    this.employerService.getEmployerById(this.employerId).subscribe({
      next: data => this.employer = data,
      error: err => console.error('Failed to load employer', err)
    });
  }

  protected readonly location = location;
}
