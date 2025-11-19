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
    private router: Router
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
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.submitEmployer();
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  isStepActive(index: number): boolean {
    return this.currentStep === index;
  }

  isStepDone(index: number): boolean {
    return index < this.currentStep;
  }

  submitEmployer() {
    if (!this.employerModel.email || !this.employerModel.password) {
      alert('Email and password are required');
      return;
    }

    const dto: EmployerDTO = {...this.employerModel};

    const formData = new FormData();

    formData.append('employer', new Blob([JSON.stringify(dto)], {type: 'application/json'}));

    if (this.logoFile) {
      formData.append('logo', this.logoFile, this.logoFile.name);
    }

    this.employerService.addEmployer(formData).subscribe({
      next: (createdEmployer: any) => {
        alert('Employer registered successfully!');

        localStorage.setItem('employerId', createdEmployer.id.toString());

        this.router.navigate(['/employer-profile']);

        this.logoFile = undefined;
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
          compensationId:null
        };
      },
      error: (err) => {
        console.error(err);
        alert('Failed to register employer. Please check your data.');
      }
    });

  }
}
