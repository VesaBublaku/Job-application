import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import {AuthService} from '../auth/auth.service';

interface EmployerDTO {
  id?: number;
  companyName?: string;
  companyLogo?: string;
  email?: string;
  password?: string;
  yearOfFounding?: string;
  aboutCompany?: string;
  locationId?: number;
  industryId?: number;
  experienceId?: number;
  availabilityId?: number;
  compensationId?: number;
  numberOfEmployeesId?: number;
  employerTypeId?: number;
}

@Component({
  selector: 'app-edit-employer-profile',
  templateUrl: './edit-employer-profile.html',
  styleUrls: ['./edit-employer-profile.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  encapsulation: ViewEncapsulation.None,
})
export class EditEmployerProfile implements OnInit {
  employer: any = {};
  selectedLogo?: File;

  location: any[] = [];
  industry: any[] = [];
  experiences: any[] = [];
  availability: any[] = [];
  compensation: any[] = [];
  numberOfEmployees: any[] = [];
  employerType: any[] = [];

  constructor(private http: HttpClient, private router: Router,
  private authService:AuthService) {}

  ngOnInit() {
    this.loadDropdowns();
    this.loadEmployer();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
  }

  loadDropdowns() {
    this.http.get<any[]>('http://localhost:8080/location/all').subscribe(data => this.location = data);
    this.http.get<any[]>('http://localhost:8080/industry/all').subscribe(data => this.industry = data);
    this.http.get<any[]>('http://localhost:8080/experience/all').subscribe(data => this.experiences = data);
    this.http.get<any[]>('http://localhost:8080/availability/all').subscribe(data => this.availability = data);
    this.http.get<any[]>('http://localhost:8080/compensation/all').subscribe(data => this.compensation = data);
    this.http.get<any[]>('http://localhost:8080/numberOfEmployees/all').subscribe(data => this.numberOfEmployees = data);
    this.http.get<any[]>('http://localhost:8080/employerType/all').subscribe(data => this.employerType = data);
  }

  onLogoSelected(event: any) {
    this.selectedLogo = event.target.files[0];
  }

  saveChanges() {
    const formData = new FormData();
    formData.append('employer', new Blob([JSON.stringify(this.employer)], { type: 'application/json' }));

    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo, this.selectedLogo.name);
    }

    this.http.put(`http://localhost:8080/employers/update/${this.employer.id}`, formData, { withCredentials: true }).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/employer-profile']);
      },
      error: err => console.error('Update failed', err)
    });
  }

  loadEmployer() {
    const employerId = localStorage.getItem('employerId');
    if (!employerId) {
      console.error('No logged-in employer ID found');
      return;
    }

    this.http.get(`http://localhost:8080/employers/find/${employerId}`, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          if (!res) {
            console.error('Employer not found');
            return;
          }

          this.employer = res;
          this.employer.locationId = res.location?.id || null;
          this.employer.industryId = res.industry?.id || null;
          this.employer.experienceId = res.experience?.id || null;
          this.employer.availabilityId = res.availability?.id || null;
          this.employer.compensationId = res.compensation?.id || null;
          this.employer.numberOfEmployeesId = res.numberOfEmployees?.id || null;
          this.employer.employerTypeId = res.employerType?.id || null;
        },
        error: (err) => console.error('Error loading employer:', err)
      });
  }

  deleteEmployer() {
    const employerId = localStorage.getItem('employerId');
    if (!employerId) {
      console.error('No logged-in employer ID found');
      return;
    }

    if (!confirm('Are you sure you want to deactivate your profile? This cannot be undone!')) return;

    this.http.delete(`http://localhost:8080/employers/delete/${employerId}`, { withCredentials: true })
      .subscribe({
        next: () => {
          alert('Your profile has been deleted.');
          localStorage.removeItem('employerId');
          this.authService.clearUser();
          window.location.href = '/home';
        },
        error: (err) => {
          console.error('Failed to delete employer:', err);
          alert('Failed to delete profile.');
        }
      });
  }

  get employerLocationName(): string {
    return this.location.find(loc => loc.id === this.employer.locationId)?.name || '';
  }
}
