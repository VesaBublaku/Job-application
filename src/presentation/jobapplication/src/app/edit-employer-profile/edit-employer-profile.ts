import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

interface EmployerDTO {
  id?: number;
  companyName: string;
  companyLogo?: string;
  yearOfFounding?: string;
  aboutCompany?: string;
  email: string;
  password?: string;

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
  employer: EmployerDTO = { companyName: '', email: '' };
  companyLogo?: File;

  location: any[] = [];
  industry: any[] = [];
  experiences: any[] = [];
  availability: any[] = [];
  compensation: any[] = [];
  numberOfEmployees: any[] = [];
  employerType: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadDropdowns().then(() => this.loadEmployer());
  }

  async loadDropdowns(): Promise<void> {
    this.location = await this.http.get<any[]>('http://localhost:8080/location/all').toPromise() || [];
    this.industry = await this.http.get<any[]>('http://localhost:8080/industry/all').toPromise() || [];
    this.experiences = await this.http.get<any[]>('http://localhost:8080/experience/all').toPromise() || [];
    this.availability = await this.http.get<any[]>('http://localhost:8080/availability/all').toPromise() || [];
    this.compensation = await this.http.get<any[]>('http://localhost:8080/compensation/all').toPromise() || [];
    this.numberOfEmployees = await this.http.get<any[]>('http://localhost:8080/numberOfEmployees/all').toPromise() || [];
    this.employerType = await this.http.get<any[]>('http://localhost:8080/employerType/all').toPromise() || [];
  }

  loadEmployer() {
    const employerId = localStorage.getItem('employerId');
    if (!employerId) return console.error('No logged-in employer ID found');

    this.http.get<EmployerDTO>(`http://localhost:8080/employers/find/${employerId}`).subscribe({
      next: (data) => {
        this.employer = {
          ...data,
          locationId: (data as any).location?.id || data.locationId,
          industryId: (data as any).industry?.id || data.industryId,
          experienceId: (data as any).experience?.id || data.experienceId,
          availabilityId: (data as any).availability?.id || data.availabilityId,
          compensationId: (data as any).compensation?.id || data.compensationId,
          numberOfEmployeesId: (data as any).numberOfEmployees?.id || data.numberOfEmployeesId,
          employerTypeId: (data as any).employerType?.id || data.employerTypeId,
        };
      },
      error: (err) => console.error('Error loading employer:', err),
    });
  }

  onLogoSelected(event: any) {
    this.companyLogo = event.target.files[0];
  }

  saveChanges() {
    const formData = new FormData();
    formData.append('employer', new Blob([JSON.stringify(this.employer)], { type: 'application/json' }));

    if (this.companyLogo) {
      formData.append('logo', this.companyLogo, this.companyLogo.name);
    }

    this.http.put(`http://localhost:8080/employers/update/${this.employer.id}`, formData, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/employer-profile']);
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  deleteEmployer() {
    if (!confirm('Are you sure you want to deactivate your profile?')) return;

    this.http.delete(`http://localhost:8080/employers/${this.employer.id}`).subscribe({
      next: () => {
        alert('Your profile has been deleted.');
        window.location.href = '/home';
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete profile.');
      },
    });
  }

  get employerLocationName(): string | undefined {
    return this.location.find(loc => loc.id === this.employer.locationId)?.name;
  }

}
