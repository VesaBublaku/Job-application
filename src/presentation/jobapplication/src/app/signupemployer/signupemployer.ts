import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NumberOfEmployees, NumberOfEmployeesService } from '../numberOfEmployees/numberOfEmployees.service';
import { Industry, IndustryService } from '../industry/industry.service';
import { EmployerType, EmployerTypeService } from '../employerType/employerType.service';
import { SignupEmployerService, EmployerDTO } from './signupemployer.service';
import { LocationService, Location as JobLocation } from '../location/location.service';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { Availability } from '../availability/availability.service';
import { Compensation } from '../compensation/compensation.service';
import {Experience, ExperienceService} from '../experience/experience.service';
import {AvailabilityService} from '../availability/availability.service';
import {CompensationService} from '../compensation/compensation.service';
import {AuthService} from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-signupemployer',
  templateUrl: './signupemployer.html',
  styleUrls: ['./signupemployer.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent, FooterComponent]
})
export class SignupEmployer implements OnInit {

  currentStep = 0;
  steps = ['Company Info', 'Profile Info', 'Welcome'];
  lastFormStepIndex = this.steps.length - 2;

  employerModel: EmployerDTO = {
    companyName: '',
    yearOfFounding: '',
    aboutCompany: '',
    email: '',
    password: '',
    locationId: null,
    numberOfEmployeesId: null,
    industryId: null,
    employerTypeId: null,
    experienceId: null,
    availabilityId: null,
    compensationId:null,
  };

  logoFile?: File;

  locations: JobLocation[] = [];
  numberOfEmployees: NumberOfEmployees[] = [];
  industry: Industry[] = [];
  employerTypes: EmployerType[] = [];
  availability: Availability[] = [];
  compensation: Compensation[] = [];
  experience: Experience[]= [];


  constructor(
    private employerService: SignupEmployerService,
    private locationService: LocationService,
    private numberOfEmployeesService: NumberOfEmployeesService,
    private industryService: IndustryService,
    private employerTypeService: EmployerTypeService,
    private availabilityService: AvailabilityService,
    private compensationService: CompensationService,
    private experienceService: ExperienceService,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.locationService.getLocations().subscribe({
      next: res => this.locations = res,
      error: err => console.error('Locations error:', err)
    });

    this.numberOfEmployeesService.getAll().subscribe({
      next: res => this.numberOfEmployees = res,
      error: err => console.error('NumberOfEmployees error:', err)
    });

    this.industryService.getAll().subscribe({
      next: res => this.industry = res,
      error: err => console.error('Industry error:', err)
    });

    this.availabilityService.getAvailability().subscribe({
      next: res => this.availability = res,
      error: err => console.error('Availability error:', err)
    });

    this.compensationService.getCompensation().subscribe({
      next: res => this.compensation = res,
      error: err => console.error('Compensation error:', err)
    });

    this.experienceService.getExperience().subscribe({
      next: res => this.experience = res,
      error: err => console.error('Compensation error:', err)
    });

    this.employerTypeService.getAll().subscribe({
      next: res => this.employerTypes = res,
      error: err => console.error('EmployerType error:', err)
    });
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.logoFile = input.files[0];
    }
  }

  nextStep() {
    if (!this.validateCurrentStep()) return;
    if (this.currentStep < this.lastFormStepIndex) {
      this.currentStep++;
    } else if (this.currentStep === this.lastFormStepIndex) {
      this.submitEmployer();
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  isStepActive(index: number) { return index === this.currentStep; }
  isStepDone(index: number) { return index < this.currentStep; }

  private validateCurrentStep(): boolean {
    const missing: string[] = [];

    if (this.currentStep === 0) {
      if (!this.employerModel.companyName) missing.push('Company Name');
      if (!this.employerModel.locationId) missing.push('Location');
      if (!this.employerModel.numberOfEmployeesId) missing.push('Number of Employees');
      if (!this.employerModel.industryId) missing.push('Industry');
      if (!this.employerModel.experienceId) missing.push('Experience');
      if (!this.employerModel.availabilityId) missing.push('Availability');
      if (!this.employerModel.compensationId) missing.push('Compensation');
    }

    if (this.currentStep === 1) {
      if (!this.employerModel.email) missing.push('Email');
      if (!this.employerModel.password) missing.push('Password');
    }

    if (missing.length) {
      alert('Please complete:\n• ' + missing.join('\n• '));
      return false;
    }

    return true;
  }

  submitEmployer() {
    const formData = new FormData();
    formData.append('employer', new Blob([JSON.stringify(this.employerModel)], { type: 'application/json' }));
    if (this.logoFile) formData.append('logo', this.logoFile, this.logoFile.name);

    this.employerService.addEmployer(formData).subscribe({
      next: (createdEmployer: any) => {
        this.employerService.getEmployerById(createdEmployer.id).subscribe((fullEmployer: any) => {
          this.authService.setUser({ ...fullEmployer, role: 'employer' });

          this.router.navigate(['/employer-profile']);
          this.resetForm();
        });
      },
      error: (err) => {
        console.error(err);
        if (err.error?.includes('Duplicate entry')) {
          alert('This email is already registered.');
        } else {
          alert('Failed to register employer. Please check your data.');
        }
      }
    });
  }

  private resetForm() {
    this.employerModel = {
      companyName: '',
      yearOfFounding: '',
      aboutCompany: '',
      email: '',
      password: '',
      locationId: null,
      numberOfEmployeesId: null,
      industryId: null,
      employerTypeId: null,
      experienceId: null,
      availabilityId: null,
      compensationId: null
    };
    this.logoFile = undefined;
    this.currentStep = 0;
  }
}
