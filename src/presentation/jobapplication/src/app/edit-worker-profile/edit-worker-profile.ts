import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

import {Profession, ProfessionService} from '../profession/profession.service';
import {Skills, SkillsService} from '../skills/skills.service';
import {JobType, JobTypeService} from '../jobType/jobType.service';
import {Location, LocationService} from '../location/location.service';
import {Education, EducationService} from '../education/education.service';
import {Experience, ExperienceService} from '../experience/experience.service';
import {Compensation, CompensationService} from '../compensation/compensation.service';
import {Availability, AvailabilityService} from '../availability/availability.service';

interface WorkerDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  dateOfBirth?: string;
  aboutYou?: string;
  locationId?: number;
  educationId?: number;
  experienceId?: number;
  compensationId?: number;
  availabilityId?: number;
  professionIds?: number[];
  skillIds?: number[];
  jobTypeIds?: number[];
}

@Component({
  selector: 'app-edit-worker-profile',
  templateUrl: './edit-worker-profile.html',
  styleUrls: ['./edit-worker-profile.css'],
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class EditWorkerProfile implements OnInit {
  worker: any = {};
  selectedPhoto: File | undefined;

  professions: Profession[] = [];
  skills: Skills[] = [];
  jobTypes: JobType[] = [];
  locations: Location[] = [];
  education: Education[] = [];
  experience: Experience[] = [];
  compensation: Compensation[] = [];
  availability: Availability[] = [];

  selectedProfessions: number[] = [];
  selectedSkills: number[] = [];
  selectedJobTypes: number[] = [];

  professionsDropdownOpen = false;
  skillsDropdownOpen = false;
  jobTypesDropdownOpen = false;

  constructor(
    private http: HttpClient,
    private professionService: ProfessionService,
    private skillsService: SkillsService,
    private jobTypeService: JobTypeService,
    private locationService: LocationService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private compensationService: CompensationService,
    private availabilityService: AvailabilityService
  ) {}

  ngOnInit() {
    this.loadDropdownData();
    this.loadWorker();
  }

  loadDropdownData() {
    this.professionService.getProfessions().subscribe(data => this.professions = data);
    this.skillsService.getSkills().subscribe(data => this.skills = data);
    this.jobTypeService.getJobType().subscribe(data => this.jobTypes = data);
    this.locationService.getLocations().subscribe(data => this.locations = data);
    this.educationService.getEducation().subscribe(data => this.education = data);
    this.experienceService.getExperience().subscribe(data => this.experience = data);
    this.compensationService.getCompensation().subscribe(data => this.compensation = data);
    this.availabilityService.getAvailability().subscribe(data => this.availability = data);
  }

  loadWorker() {
    const workerId = localStorage.getItem('workerId');
    if (!workerId) {
      console.error('No logged-in worker ID found');
      return;
    }

    this.http.get(`http://localhost:8080/worker/find/${workerId}`).subscribe(
      (res: any) => {
        this.worker = res;

        if (this.worker.dateOfBirth) {
          this.worker.dateOfBirth = this.worker.dateOfBirth.split('T')[0];
        }

        this.worker.locationId = res.location?.id;
        this.worker.educationId = res.education?.id;
        this.worker.experienceId = res.experience?.id;
        this.worker.compensationId = res.compensation?.id;
        this.worker.availabilityId = res.availability?.id;

        // Preselect multi-select IDs
        this.selectedProfessions = res.professions?.map((p: any) => p.id) || [];
        this.selectedSkills = res.skills?.map((s: any) => s.id) || [];
        this.selectedJobTypes = res.jobTypes?.map((j: any) => j.id) || [];
      },
      err => console.error('Error loading worker:', err)
    );
  }
  get selectedProfessionObjects() {
    return this.professions.filter(p => this.selectedProfessions.includes(p.id));
  }
  get selectedSkillObjects() {
    return this.skills.filter(s => this.selectedSkills.includes(s.id));
  }
  get selectedJobTypeObjects() {
    return this.jobTypes.filter(j => this.selectedJobTypes.includes(j.id));
  }

  toggleProfessionsDropdown(event: MouseEvent) { event.stopPropagation(); this.professionsDropdownOpen = !this.professionsDropdownOpen; }
  toggleSkillsDropdown(event: MouseEvent) { event.stopPropagation(); this.skillsDropdownOpen = !this.skillsDropdownOpen; }
  toggleJobTypesDropdown(event: MouseEvent) { event.stopPropagation(); this.jobTypesDropdownOpen = !this.jobTypesDropdownOpen; }

  toggleProfession(id: number) { this.selectedProfessions = this.selectedProfessions.includes(id) ? this.selectedProfessions.filter(p => p !== id) : [...this.selectedProfessions, id]; }
  removeProfession(id: number) { this.selectedProfessions = this.selectedProfessions.filter(p => p !== id); }

  toggleSkill(id: number) { this.selectedSkills = this.selectedSkills.includes(id) ? this.selectedSkills.filter(s => s !== id) : [...this.selectedSkills, id]; }
  removeSkill(id: number) { this.selectedSkills = this.selectedSkills.filter(s => s !== id); }

  toggleJobType(id: number) { this.selectedJobTypes = this.selectedJobTypes.includes(id) ? this.selectedJobTypes.filter(j => j !== id) : [...this.selectedJobTypes, id]; }
  removeJobType(id: number) { this.selectedJobTypes = this.selectedJobTypes.filter(j => j !== id); }

  onPhotoSelected(event: any) { this.selectedPhoto = event.target.files[0]; }

  saveChanges() {
    const formData = new FormData();

    const workerData: WorkerDTO = {
      ...this.worker,
      professionIds: this.selectedProfessions,
      skillIds: this.selectedSkills,
      jobTypeIds: this.selectedJobTypes,
      locationId: this.worker.locationId,
      educationId: this.worker.educationId,
      experienceId: this.worker.experienceId,
      compensationId: this.worker.compensationId,
      availabilityId: this.worker.availabilityId
    };

    formData.append('worker', JSON.stringify(workerData));
    if (this.selectedPhoto) formData.append('photo', this.selectedPhoto);

    this.http.put(`http://localhost:8080/worker/${this.worker.id}`, formData)
      .subscribe(() => alert('Profile updated successfully!'));
  }
}
