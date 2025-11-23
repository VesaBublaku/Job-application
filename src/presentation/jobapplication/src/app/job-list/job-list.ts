import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgForOf, CommonModule } from '@angular/common';

import { JobListService } from './job-list.service';
import { Employer } from './job';
import { Industry, IndustryService } from '../industry/industry.service';
import { Compensation, CompensationService } from '../compensation/compensation.service';
import { JobType, JobTypeService } from '../jobType/jobType.service';
import { Availability, AvailabilityService } from '../availability/availability.service';
import { Experience, ExperienceService } from '../experience/experience.service';
import { Location, LocationService } from '../location/location.service';

@Component({
  standalone: true,
  selector: 'app-job-list',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    FormsModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css'],
})
export class JobList implements OnInit {

  employers: Employer[] = [];
  industries: Industry[] = [];
  compensations: Compensation[] = [];
  jobTypes: JobType[] = [];
  availabilities: Availability[] = [];
  experiences: Experience[] = [];
  locations: Location[] = [];

  sortOption: string = 'newest';

  filterModel = {
    companyName: '',
    industryId: null,
    compensationId: null,
    jobTypeId: null,
    availabilityId: null,
    experienceId: null,
    locationId: null
  };

  constructor(
    private jobService: JobListService,
    private industryService: IndustryService,
    private compensationService: CompensationService,
    private jobTypeService: JobTypeService,
    private availabilityService: AvailabilityService,
    private experienceService: ExperienceService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.loadAllEmployers();
    this.loadFilterOptions();
  }

  loadAllEmployers() {
    this.jobService.findAll().subscribe({
      next: data => {
        this.employers = data;
        this.sortEmployers();
      },
      error: err => console.error('Error loading employers:', err)
    });
  }

  loadFilterOptions() {
    this.industryService.getAll().subscribe(data => this.industries = data);
    this.compensationService.getCompensation().subscribe(data => this.compensations = data);
    this.jobTypeService.getJobType().subscribe(data => this.jobTypes = data);
    this.availabilityService.getAvailability().subscribe(data => this.availabilities = data);
    this.experienceService.getExperience().subscribe(data => this.experiences = data);
    this.locationService.getLocations().subscribe(data => this.locations = data);
  }

  findEmployers() {
    this.jobService.searchEmployers(this.filterModel).subscribe({
      next: data => {
        this.employers = data;
        this.sortEmployers();
      },
      error: err => console.error('Error filtering employers:', err)
    });
  }

  sortEmployers() {
    if (!this.employers || this.employers.length === 0) return;

    switch (this.sortOption) {
      case "newest":
        this.employers.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        break;

      case "oldest":
        this.employers.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        break;

      case "highestWage":
        this.employers.sort((a, b) =>
          this.getNumericCompensation(b.compensation?.compensation ?? '0') -
          this.getNumericCompensation(a.compensation?.compensation ?? '0')
        );
        break;

      case "lowestWage":
        this.employers.sort((a, b) =>
          this.getNumericCompensation(a.compensation?.compensation ?? '0') -
          this.getNumericCompensation(b.compensation?.compensation ?? '0')
        );
        break;
    }
  }

  getNumericCompensation(value: string): number {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  encode(filename: string): string {
    return encodeURIComponent(filename);
  }
}
