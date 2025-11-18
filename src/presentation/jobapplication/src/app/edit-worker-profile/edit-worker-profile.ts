<<<<<<< Updated upstream
import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink} from '@angular/router';

@Component({
  standalone:true,
=======
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkerDTO } from '../signup/signup.service';
import { ProfessionService, Profession } from '../profession/profession.service';
import { SkillsService, Skills } from '../skills/skills.service';
import { JobTypeService, JobType } from '../jobType/jobType.service';
import { LocationService, Location } from '../location/location.service';
import { EducationService, Education } from '../education/education.service';
import { ExperienceService, Experience } from '../experience/experience.service';
import { CompensationService, Compensation } from '../compensation/compensation.service';
import { AvailabilityService, Availability } from '../availability/availability.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {CommonModule} from '@angular/common';

@Component({
>>>>>>> Stashed changes
  selector: 'app-edit-worker-profile',
  templateUrl: './edit-worker-profile.html',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink
  ],
<<<<<<< Updated upstream
  templateUrl: './edit-worker-profile.html',
  styleUrl: './edit-worker-profile.css',
})
export class EditWorkerProfile {

=======
  styleUrls: ['./edit-worker-profile.css']
})
export class EditWorkerProfile implements OnInit {
  worker: any = {};
  selectedPhoto: File | undefined;

  professions: Profession[] = [];
  skills: Skills[] = [];
  jobType: JobType[] = [];
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
    this.loadData();
    this.loadWorker();
  }

  loadData() {
    this.professionService.getProfessions().subscribe(data => this.professions = data);
    this.skillsService.getSkills().subscribe(data => this.skills = data);
    this.jobTypeService.getJobType().subscribe(data => this.jobType = data);
    this.locationService.getLocations().subscribe(data => this.locations = data);
    this.educationService.getEducation().subscribe(data => this.education = data);
    this.experienceService.getExperience().subscribe(data => this.experience = data);
    this.compensationService.getCompensation().subscribe(data => this.compensation = data);
    this.availabilityService.getAvailability().subscribe(data => this.availability = data);
  }

  loadWorker() {
    this.http.get('http://localhost:8080/worker/1').subscribe((res: any) => {
      this.worker = res;
      this.selectedProfessions = res.professions?.map((p: any) => p.id) || [];
      this.selectedSkills = res.skills?.map((s: any) => s.id) || [];
      this.selectedJobTypes = res.jobTypes?.map((j: any) => j.id) || [];
    });
  }

  get selectedProfessionObjects() { return this.professions.filter(p => this.selectedProfessions.includes(p.id)); }
  get selectedSkillObjects() { return this.skills.filter(s => this.selectedSkills.includes(s.id)); }
  get selectedJobTypeObjects() { return this.jobType.filter(j => this.selectedJobTypes.includes(j.id)); }

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
    const workerData: WorkerDTO = { ...this.worker, professionIds: this.selectedProfessions, skillIds: this.selectedSkills, jobTypeIds: this.selectedJobTypes };
    formData.append('worker', JSON.stringify(workerData));
    if (this.selectedPhoto) formData.append('photo', this.selectedPhoto);

    this.http.put(`http://localhost:8080/worker/${this.worker.id}`, formData).subscribe(() => alert('Profile updated!'));
  }
>>>>>>> Stashed changes
}
