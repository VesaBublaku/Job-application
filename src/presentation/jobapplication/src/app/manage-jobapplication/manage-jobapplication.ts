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
  imports: [FooterComponent, FormsModule, HeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-jobapplication.html',
  styleUrl: './manage-jobapplication.css',
})
export class ManageJobapplication implements OnInit{
  jobs: Employer[] = [];
  selectedJob: Employer | null = null;
  formModel:Employer = this.createEmptyEmployer();
  jobTypesInput = '';
  selectedLogoFile: File | undefined;
  industries: Industry[] = [];
  experiences: Experience[] = [];
  availabilities: Availability[] = [];
  compensations: Compensation[] = [];
  jobTypes: JobType[] = [];
  locations: Location[] = [];

  showAddEditModal = false;
  showDeleteModal = false;
  isEditMode = false;

  constructor(private jobService: JobListService, private industryService: IndustryService, private experienceService: ExperienceService, private availabilityService: AvailabilityService, private compensationService: CompensationService, private jobTypeService: JobTypeService, private locationService: LocationService) {}

  ngOnInit() {
    this.loadJobs();
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
    this.selectedJob = null;
    this.jobTypesInput = '';
    this.showAddEditModal = true;
  }

  openEditModal(job: Employer): void {
    this.isEditMode = true;
    this.selectedJob = job;

    this.formModel = {
      ...job,
      location: {...job.location},
      numberOfEmployees: {...job.numberOfEmployees},
      industry: {...job.industry},
      employerType: {...job.employerType},
      experience: {...job.experience},
      availability: {...job.availability},
      compensation: {...job.compensation},
      jobTypes: job.jobTypes ? job.jobTypes.map(jt => ({...jt})) : [],
    };

    this.jobTypesInput = (job.jobTypes || [])
      .map(jt => jt.jobType)
      .join(', ');

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
    console.log("SAVE JOB FIRED!");
    this.formModel.jobTypes = this.jobTypesInput
      .split(',')
      .map(x => x.trim())
      .filter(x => x.length > 0)
      .map(name => ({jobType: name}));

    const dto = {
      companyName: this.formModel.companyName,
      companyLogo: this.formModel.companyLogo,
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

      jobTypes: this.formModel.jobTypes.map(j => ({ jobType: j.jobType }))
    };

    if(this.isEditMode && this.selectedJob) {
      this.jobService.updateJob(this.selectedJob.id, this.formModel).subscribe({
          next: () => {
            this.loadJobs();
            this.closeModal();
          },
          error: err => console.error('Error updating job', err),
        });
    } else {
      this.jobService.addJob(this.formModel, this.selectedLogoFile).subscribe({
        next:() => {
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
      location: null,
      industry: null,
      experience: null,
      availability: null,
      compensation: null,
      numberOfEmployees: null,
      employerType: null,
      jobTypes:[],
    };
  }
}
