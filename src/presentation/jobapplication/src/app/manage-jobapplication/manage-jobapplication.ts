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
  jobTypesInput = '';
  selectedLogoFile: File | undefined;
  industries: Industry[] = [];
  experiences: Experience[] = [];
  availabilities: Availability[] = [];
  compensations: Compensation[] = [];
  jobTypes: JobType[] = [];
  locations: Location[] = [];
  selectedJobTypeObjects: JobType[] = [];
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
  }

  onLogoSelected(event: any) {
    this.selectedLogoFile = event.target.files[0];
  }

  loadJobs(): void {
    const employerId = Number(localStorage.getItem("employerId"));
    if (!employerId) return;

    if (!employerId || employerId === 0) {
      console.error("No employerId found in localStorage");
      return;
    }

    this.jobService.getJobsByEmployer(employerId).subscribe({
      next: jobs => this.jobs = jobs,
      error: err => console.error('Error loading employer jobs', err)
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

  toggleJobTypesDropdown(event: any): void {
    this.jobTypesDropdownOpen = !this.jobTypesDropdownOpen;
  }

  isSelected(jt: JobType): boolean {
    return this.selectedJobTypeObjects.some(s => s.id === jt.id);
  }

  toggleJobType(jt: JobType): void {
    this.selectedJobTypeObjects = this.selectedJobTypeObjects.filter(
      s => s.jobType && s.jobType.trim() !== ""
    );

    if (this.isSelected(jt)) {
      this.selectedJobTypeObjects =
        this.selectedJobTypeObjects.filter(s => s.id !== jt.id);
    } else {
      this.selectedJobTypeObjects.push({ id: jt.id, jobType: jt.jobType });
    }
    this.formModel.jobTypes = [...this.selectedJobTypeObjects];
  }

  removeJobType(jt: { id: number | null }): void {
    this.selectedJobTypeObjects = this.selectedJobTypeObjects.filter(
      s => s.jobType && s.jobType.trim() !== "");

    this.selectedJobTypeObjects =
      this.selectedJobTypeObjects.filter(s => s.id !== jt.id);
    this.formModel.jobTypes = [...this.selectedJobTypeObjects];
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
    this.selectedJobTypeObjects = [];
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
      jobTypes: job.jobTypes ? job.jobTypes.map(jt => ({id: (jt as any).id ?? null, jobType: (jt as any).jobType,})) : [],
    };

    this.selectedJobTypeObjects = job.jobTypes ? job.jobTypes.map(jt => ({id: (jt as any).id ?? null, jobType: (jt as any).jobType,})) : [];
    this.formModel.jobTypes = [...this.selectedJobTypeObjects];
    this.jobTypesInput = this.formModel.jobTypes.map(j => j.jobType).join(', ');
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

    const missing = [];

    if(!this.formModel.industry?.id) missing.push("Industry");
    if(!this.formModel.companyName) missing.push("Company name");
    if(!this.formModel.email) missing.push("Email");
    if(!this.formModel.experience?.id) missing.push("Experience");
    if(!this.formModel.availability?.id) missing.push("Availability");
    if(!this.formModel.compensation?.id) missing.push("Compensation");
    if(!this.formModel.location?.id) missing.push("Location");

    if(!this.selectedJobTypeObjects || this.selectedJobTypeObjects.length === 0) {
      missing.push("Job types");
    }

    if(missing.length > 0) {
      alert("Please fill the following required fields:\n\n" + missing.join("\n"));
      return;
    }

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

      jobTypes: this.formModel.jobTypes.map(j => ({id: j.id, jobType: j.jobType})),
      createdByEmployerId: this.isEditMode
        ? this.selectedJob?.createdByEmployerId
        : Number(localStorage.getItem("employerId"))
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

  isYearValid(): boolean {
    if(!this.formModel.yearOfFounding) return false;

    const selected = new Date(this.formModel.yearOfFounding);
    const today = new Date();

    return selected <= today;
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
      createdByEmployerId: 0,
      location: { id: 0, name: '' },
      numberOfEmployees: { id: 0, numberOfEmployees: '' },
      industry: { id: 0, name: '' },
      employerType: { id: 0, type: '' },
      experience: { id: 0, experience: '' },
      availability: { id: 0, availability: '' },
      compensation: { id: 0, compensation: '' },
      jobTypes:[],
      applications:[],
    };
  }

}
