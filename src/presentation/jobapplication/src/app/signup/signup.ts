import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { WorkerDTO, SignupService } from './signup.service';
import { LocationService, Location as JobLocation } from '../location/location.service';
import { ProfessionService, Profession } from '../profession/profession.service';
import { EducationService, Education } from '../education/education.service';
import { ExperienceService, Experience } from '../experience/experience.service';
import { JobTypeService, JobType } from '../jobType/jobType.service';
import { SkillsService, Skills } from '../skills/skills.service';
import { CompensationService, Compensation } from '../compensation/compensation.service';
import { AvailabilityService, Availability } from '../availability/availability.service';
import {AuthService} from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent, FooterComponent],
})
export class Signup implements OnInit {
  steps = ['Personal info', 'Professional info', 'Contact info', 'Welcome'];
  currentStep = 0;
  private readonly lastFormStepIndex = this.steps.length - 2;

  skillsDropdownOpen = false;
  jobTypesDropdownOpen = false;
  professionsDropdownOpen = false;
  worker: any = {};
  selectedSkills: number[] = [];
  selectedJobTypes: number[] = [];
  selectedProfessions: number[] = [];
  selectedPhoto: File | undefined;

  locations: JobLocation[] = [];
  professions: Profession[] = [];
  education: Education[] = [];
  experience: Experience[] = [];
  jobTypes: JobType[] = [];
  skillsList: Skills[] = [];
  compensation: Compensation[] = [];
  availability: Availability[] = [];

  workerData: WorkerDTO = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    aboutYou: '',
    locationId: null,
    educationId: null,
    experienceId: null,
    compensationId: null,
    availabilityId: null,
    professionIds: [],
    jobTypeIds: [],
    skillIds: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private workerService: SignupService,
    private locationService: LocationService,
    private professionService: ProfessionService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private jobTypeService: JobTypeService,
    private skillsService: SkillsService,
    private compensationService: CompensationService,
    private availabilityService: AvailabilityService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    const workerId = this.route.snapshot.paramMap.get('id'); // dynamic ID
    this.loadLocations();
    this.loadProfessions();
    this.loadEducation();
    this.loadExperience();
    this.loadJobTypes();
    this.loadSkills();
    this.loadCompensation();
    this.loadAvailability();
    if (workerId) this.loadWorker(workerId);
  }

  private loadLocations() { this.locationService.getLocations().subscribe(data => this.locations = data); }
  private loadProfessions() { this.professionService.getProfessions().subscribe(data => this.professions = data); }
  private loadEducation() { this.educationService.getEducation().subscribe(data => this.education = data); }
  private loadExperience() { this.experienceService.getExperience().subscribe(data => this.experience = data); }
  private loadJobTypes() { this.jobTypeService.getJobType().subscribe(data => this.jobTypes = data); }
  private loadSkills() { this.skillsService.getSkills().subscribe(data => this.skillsList = data); }
  private loadCompensation() { this.compensationService.getCompensation().subscribe(data => this.compensation = data); }
  private loadAvailability() { this.availabilityService.getAvailability().subscribe(data => this.availability = data); }

  private loadWorker(id: string) {
    this.http.get(`http://localhost:8080/worker/${id}`).subscribe((res: any) => {
      this.worker = res;

      this.selectedSkills = this.worker.skills.map((s: any) => s.id);
      this.selectedJobTypes = this.worker.jobTypes.map((j: any) => j.id);
      this.selectedProfessions = this.worker.professions.map((p: any) => p.id);

      this.workerData = {
        ...this.workerData,
        firstName: this.worker.firstName,
        lastName: this.worker.lastName,
        dateOfBirth: this.worker.dateOfBirth,
        email: this.worker.email,
        password: this.worker.password,
        aboutYou: this.worker.aboutYou,
        locationId: this.worker.location?.id,
        educationId: this.worker.education?.id,
        experienceId: this.worker.experience?.id,
        compensationId: this.worker.compensation?.id,
        availabilityId: this.worker.availability?.id,
        skillIds: this.selectedSkills,
        jobTypeIds: this.selectedJobTypes,
        professionIds: this.selectedProfessions
      };
    });
  }

  get selectedSkillObjects(): Skills[] {
    return this.skillsList.filter(s => this.selectedSkills.includes(s.id));
  }

  get selectedJobTypeObjects(): JobType[] {
    return this.jobTypes.filter(jt => this.selectedJobTypes.includes(jt.id));
  }

  get selectedProfessionObjects(): Profession[] {
    return this.professions.filter(p => this.selectedProfessions.includes(p.id));
  }

  toggleSkillsDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
  }

  toggleJobTypesDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.jobTypesDropdownOpen = !this.jobTypesDropdownOpen;
  }

  toggleProfessionsDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.professionsDropdownOpen = !this.professionsDropdownOpen;
  }

  toggleSkill(id: number) {
    if (this.selectedSkills.includes(id)) {
      this.selectedSkills = this.selectedSkills.filter(sid => sid !== id);
    } else {
      this.selectedSkills = [...this.selectedSkills, id];
    }
    this.workerData.skillIds = this.selectedSkills;
  }

  removeSkill(id: number) {
    this.selectedSkills = this.selectedSkills.filter(sid => sid !== id);
    this.workerData.skillIds = this.selectedSkills;
  }

  toggleJobType(id: number) {
    if (this.selectedJobTypes.includes(id)) {
      this.selectedJobTypes = this.selectedJobTypes.filter(jid => jid !== id);
    } else {
      this.selectedJobTypes = [...this.selectedJobTypes, id];
    }
    this.workerData.jobTypeIds = this.selectedJobTypes;
  }

  removeJobType(id: number) {
    this.selectedJobTypes = this.selectedJobTypes.filter(jid => jid !== id);
    this.workerData.jobTypeIds = this.selectedJobTypes;
  }

  toggleProfession(id: number) {
    if (this.selectedProfessions.includes(id)) {
      this.selectedProfessions = this.selectedProfessions.filter(pid => pid !== id);
    } else {
      this.selectedProfessions = [...this.selectedProfessions, id];
    }
    this.workerData.professionIds = this.selectedProfessions;
  }

  removeProfession(id: number) {
    this.selectedProfessions = this.selectedProfessions.filter(pid => pid !== id);
    this.workerData.professionIds = this.selectedProfessions;
  }


  nextStep(form?: NgForm) {
    if (this.currentStep >= this.lastFormStepIndex) return;

    const valid = this.validateCurrentStep(form);
    if (!valid) return;

    this.currentStep++;
  }

  private validateCurrentStep(form?: NgForm): boolean {
    switch (this.currentStep) {
      case 0:
        return this.validateStep0(form);
      case 1:
        return this.validateStep1();
      case 2:
        return this.validateStep2(form);
      default:
        return true;
    }
  }

  private validateStep0(form?: NgForm): boolean {
    const missing: string[] = [];

    if (!this.workerData.firstName?.trim()) missing.push("First name");
    if (!this.workerData.lastName?.trim()) missing.push("Last name");
    if (!this.workerData.locationId) missing.push("Location");

    if (missing.length) {
      alert("Please complete:\n• " + missing.join("\n• "));
      return false;
    }
    return true;
  }

  private validateStep1(): boolean {
    const missing: string[] = [];

    if (this.selectedProfessions.length === 0) missing.push("Profession(s)");
    if (!this.workerData.educationId) missing.push("Education");
    if (!this.workerData.experienceId) missing.push("Experience");
    if (this.selectedJobTypes.length === 0) missing.push("Job type(s)");
    if (this.selectedSkills.length === 0) missing.push("Skill(s)");
    if (!this.workerData.compensationId) missing.push("Compensation");
    if (!this.workerData.availabilityId) missing.push("Availability");

    if (missing.length) {
      alert("Please complete:\n• " + missing.join("\n• "));
      return false;
    }
    return true;
  }

  private validateStep2(form?: NgForm): boolean {
    const missing: string[] = [];

    if (!this.workerData.email?.trim()) missing.push("Email");
    if (!this.workerData.password?.trim()) missing.push("Password");

    if (form) {
      if (form.controls['email']?.invalid) missing.push("Valid email");
      if (form.controls['password']?.invalid) missing.push("Valid password");
    }

    if (missing.length) {
      alert("Please complete:\n• " + missing.join("\n• "));
      return false;
    }
    return true;
  }

  prevStep() { if (this.currentStep > 0) this.currentStep--; }
  isStepActive(index: number) { return index === this.currentStep && index <= this.lastFormStepIndex; }
  isStepDone(index: number) { return index < this.currentStep; }

  onPhotoSelected(event: any) { this.selectedPhoto = event.target.files[0]; }

  onSkills(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSkills = Array.from(select.selectedOptions).map(option => Number(option.value));
    this.workerData.skillIds = this.selectedSkills;
    console.log('Selected Skills:', this.selectedSkills);
  }

  onJobType(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedJobTypes = Array.from(select.selectedOptions).map(option => Number(option.value));
    this.workerData.jobTypeIds = this.selectedJobTypes;
    console.log('Selected Job Types:', this.selectedJobTypes);
  }

  onProfessions(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedProfessions = Array.from(select.selectedOptions).map(option => Number(option.value));
    this.workerData.professionIds = this.selectedProfessions;
    console.log('Selected Professions:', this.selectedProfessions);
  }

  signUp(form:NgForm) {
    if (form.invalid) {
      alert("Please fill in all required fields before signing up.");
      return;
    }
    const formData = new FormData();
    formData.append('worker', JSON.stringify(this.workerData));
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.workerService.addWorker(formData).subscribe({
      next: (createdWorker: any) => {
        this.workerService.getWorkerById(createdWorker.id).subscribe(fullWorker => {
          this.authService.setUser({...fullWorker, role: 'worker'});

          this.router.navigate(['/worker-profile']);
        });
      },
      error: (err) => {
        console.error(err);
        alert('Failed to register worker.');
      }
    });
  }

  private resetForm() {
    this.workerData = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      aboutYou: '',
      locationId: null,
      educationId: null,
      experienceId: null,
      compensationId: null,
      availabilityId: null,
      professionIds: [],
      jobTypeIds: [],
      skillIds: []
    };
    this.selectedSkills = [];
    this.selectedJobTypes = [];
    this.selectedProfessions = [];
    this.selectedPhoto = undefined;
    this.currentStep = 0;
  }
}
