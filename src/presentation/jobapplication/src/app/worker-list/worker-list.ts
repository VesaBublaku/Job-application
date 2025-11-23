import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink} from "@angular/router";
import {Profession, ProfessionService} from '../profession/profession.service';
import {Compensation, CompensationService} from '../compensation/compensation.service';
import {JobType, JobTypeService} from '../jobType/jobType.service';
import {Availability, AvailabilityService} from '../availability/availability.service';
import {Experience, ExperienceService} from '../experience/experience.service';
import {Education, EducationService} from '../education/education.service';
import {Worker, WorkerListService} from './worker-list.service';
import {Location, LocationService} from '../location/location.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-worker-list',
  imports: [HeaderComponent, FooterComponent, RouterLink, ReactiveFormsModule, FormsModule, NgForOf],
  templateUrl: './worker-list.html',
  styleUrl: './worker-list.css',
})

export class WorkerList implements OnInit{
  workers: Worker[] = [];
  professions: Profession[] = [];
  compensations: Compensation[] = [];
  jobTypes: JobType[] = [];
  availabilities: Availability[] = [];
  experiences: Experience[] = [];
  educations: Education[] = [];
  locations: Location[] = [];

  filterModel = {
    professionId: null,
    compensationId: null,
    jobTypeId: null,
    availabilityId: null,
    experienceId: null,
    educationId: null,
    locationId: null
  };

  constructor(private workerService: WorkerListService,
              private professionService: ProfessionService,
              private compensationService: CompensationService,
              private jobTypeService: JobTypeService,
              private availabilityService: AvailabilityService,
              private experienceService: ExperienceService,
              private educationService: EducationService,
              private locationService: LocationService) {}

  ngOnInit() {
    this.loadAllWorkers();
    this.loadFilterOptions();
  }

  loadAllWorkers() {
    this.workerService.findAll().subscribe(data => {
      this.workers = data;
    });
  }

  loadFilterOptions() {
    this.professionService.getProfessions().subscribe(data => this.professions = data);
    this.compensationService.getCompensation().subscribe(data => this.compensations = data);
    this.jobTypeService.getJobType().subscribe(data => this.jobTypes = data);
    this.availabilityService.getAvailability().subscribe(data => this.availabilities = data);
    this.experienceService.getExperience().subscribe(data => this.experiences = data);
    this.educationService.getEducation().subscribe(data => this.educations = data);
    this.locationService.getLocations().subscribe(data => this.locations = data);
  }

  findWorkers() {
    this.workerService.searchWorkers(this.filterModel).subscribe(data => {
      this.workers = data;
    })
  }
}

