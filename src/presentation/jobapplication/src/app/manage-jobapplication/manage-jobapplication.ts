import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header";
import {Employer} from '../job-list/job';
import {JobListService} from '../job-list/job-list.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Industry, IndustryService} from '../industry/industry.service';
import {Experience, ExperienceService} from '../experience/experience.service';
import {Availability, AvailabilityService} from '../availability/availability.service';
import {Compensation, CompensationService} from '../compensation/compensation.service';
import {JobType, JobTypeService} from '../jobType/jobType.service';
import {Location, LocationService} from '../location/location.service';

@Component({
  selector: 'app-manage-jobapplication',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, FormsModule,  CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-jobapplication.html',
  styleUrl: './manage-jobapplication.css',
})
export class ManageJobapplication implements OnInit{
  jobs: Employer[] = [];
  selectedJob: Employer | null = null;

  formModel:Employer = this.createEmptyEmployer();
  selectedLogoFile: File | undefined;
  industries: Industry[] = [];
  experiences: Experience[] = [];
  availabilities: Availability[] = [];
  compensations: Compensation[] = [];
  jobTypes: JobType[] = [];
  locations: Location[] = [];
  selectedJobTypes: number[] =[];

  showAddEditModal = false;
  showDeleteModal = false;
  isEditMode = false;
  jobTypesDropdownOpen = false;

  constructor(private jobService: JobListService, private industryService: IndustryService, private experienceService: ExperienceService, private availabilityService: AvailabilityService, private compensationService: CompensationService, private jobTypeService: JobTypeService, private locationService: LocationService) {}

  ngOnInit() {
    this.loadJobs();
    this.getIndustries();
    this.getExperiences();
    this.getAvailabilities();
    this.getCompensations();
    this.getJobTypes();
    this.getLocations();

    document.addEventListener("click", () => {
      this.jobTypesDropdownOpen = false;
    });
  }

  onLogoSelected(event: any) {
    this.selectedLogoFile = event.target.files[0];
  }

  loadJobs(): void {
    this.jobService.findAll().subscribe({
      next: jobs => this.jobs = jobs,
      error: err => console.error('Error loading jobs', err)
    });
  }

  getIndustries(): void {
    this.industryService.getAll().subscribe({
      next: (list: Industry[]) => {
        this.industries = list;
      },
      error: (err: any) => {
        console.error('Failed to load industries: ', err);
      }
    });
  }

  getExperiences(): void {
    this.experienceService.getExperience().subscribe({
      next: (list: Experience[]) => {
        this.experiences = list;
      },
      error: (err: any) => {
        console.error('Failed to load experiences: ', err);
      }
    });
  }

  getAvailabilities(): void {
    this.availabilityService.getAvailability().subscribe({
      next: (list: Availability[]) => {
        this.availabilities = list;
      },
      error: (err: any) => {
        console.error('Failed to load availabilities: ', err);
      }
    });
  }

  getCompensations(): void {
    this.compensationService.getCompensation().subscribe({
      next: (list: Compensation[]) => {
        this.compensations = list;
      },
      error: (err: any) => {
        console.error('Failed to load compensations: ', err);
      }
    });
  }

  getJobTypes(): void {
    this.jobTypeService.getJobType().subscribe({
      next: (list: JobType[]) => {
        this.jobTypes = list;
      },
      error: (err: any) => {
        console.error('Failed to load job types: ', err);
      }
    });
  }

  toggleDropdown() {
    this.jobTypesDropdownOpen = !this.jobTypesDropdownOpen;
  }

  toggleJobType(id: number) {
    if (this.selectedJobTypes.includes(id)) {
      this.selectedJobTypes = this.selectedJobTypes.filter(x => x !== id);
    } else {
      this.selectedJobTypes = [...this.selectedJobTypes, id];
    }

    this.formModel.jobTypes = this.selectedJobTypeObjects;
  }

  removeJobType(id: number) {
    this.selectedJobTypes = this.selectedJobTypes.filter(x => x !== id);
    this.formModel.jobTypes = this.selectedJobTypeObjects;
  }

  get selectedJobTypeObjects(): JobType[] {
    return this.jobTypes.filter(j => this.selectedJobTypes.includes(j.id));
  }

  getLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (list: Location[]) => {
        this.locations = list;
      },
      error: (err: any) => {
        console.error('Failed to load locations: ', err);
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.formModel = this.createEmptyEmployer();
    this.selectedLogoFile = undefined;
    this.selectedJob = null;
    this.selectedJobTypes = [];
    this.jobTypesDropdownOpen = false;
    this.showAddEditModal = true;
  }

  openEditModal(job: Employer): void {
    this.isEditMode = true;
    this.selectedLogoFile = undefined;
    this.selectedJob = job;

    this.formModel = {
      ...job,
      location: job.location ?? { id: null, name: '' },
      numberOfEmployees: job.numberOfEmployees ?? { id: null, numberOfEmployees: '' },
      industry: job.industry ?? { id: null, name: '' },
      employerType: job.employerType ?? { id: null, type: '' },
      experience: job.experience ?? { id: null, experience: '' },
      availability: job.availability ?? { id: null, availability: '' },
      compensation: job.compensation ?? { id: null, compensation: '' },
      jobTypes: job.jobTypes
    };

    this.selectedJobTypes = job.jobTypes ? job.jobTypes.map(j => j.id) : [];
    this.formModel.jobTypes = [...job.jobTypes];
    this.jobTypesDropdownOpen = false;

    this.showAddEditModal = true;
  }

openDeleteModal(job: Employer): void {
    this.selectedJob = job;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showAddEditModal = false;
    this.showDeleteModal = false;
    this.selectedJob = null;
  }

  saveJob(): void {

    const dto = {
      companyName: this.formModel.companyName,
      yearOfFounding: this.formModel.yearOfFounding,
      aboutCompany: this.formModel.aboutCompany,
      email: this.formModel.email,
      password: this.formModel.password,

      locationId: this.formModel.location?.id || null,
      industryId: this.formModel.industry?.id || null,
      experienceId: this.formModel.experience?.id || null,
      availabilityId: this.formModel.availability?.id || null,
      compensationId: this.formModel.compensation?.id || null,
      numberOfEmployeesId: this.formModel.numberOfEmployees?.id || null,
      employerTypeId: this.formModel.employerType?.id || null,
      jobTypes: this.selectedJobTypes.map(id => ({ id }))
    };

    if(this.isEditMode && this.selectedJob) {
      this.jobService.updateJob(this.selectedJob.id, dto, this.selectedLogoFile).subscribe({
          next: () => {
            this.selectedLogoFile = undefined;
            this.loadJobs();
            this.closeModal();
          },
          error: err => console.error('Error updating job', err),
        });
    } else {
      this.jobService.addJob(dto, this.selectedLogoFile).subscribe({
        next:() => {
          this.selectedLogoFile = undefined;
          this.loadJobs();
          this.closeModal();
        },
        error: err => console.error('Error adding job', err),
      });
    }
  }

  confirmDelete(): void {
    if(!this.selectedJob) return;

    this.jobService.deleteJob(this.selectedJob.id).subscribe({
      next: () => {
        this.loadJobs();
        this.closeModal();
      },
      error: err => console.error('Error deleting job', err)
    });
  }

  private createEmptyEmployer(): Employer {
    return {
      id: 0,
      companyName: '',
      companyLogo:'',
      yearOfFounding: '',
      aboutCompany: '',
      email: '',
      password: '',
      location: { id: 0, name: '' },
      numberOfEmployees: { id: 0, numberOfEmployees: '' },
      industry: { id: 0, name: '' },
      employerType: { id: 0, type: '' },
      experience: { id: 0, experience: '' },
      availability: { id: 0, availability: '' },
      compensation: { id: 0, compensation: '' },
      jobTypes:[],
    };
  }
}

