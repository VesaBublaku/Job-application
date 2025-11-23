import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { WorkerProfileService} from './worker-profile.service';
import { Worker } from '../signup/signup.service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';

export interface Profession { id: number; profession: string; }
export interface Skill { id: number; skill: string; }
export interface JobType { id: number; type: string; }
export interface Location { id: number; name: string; }
export interface Education { id: number; name: string; }
export interface Experience { id: number; name: string; }
export interface Compensation { id: number; type: string; }
export interface Availability { id: number; type: string; }

@Component({
  selector: 'app-workerprofile',
  templateUrl: './worker-profile.html',
  styleUrls: ['./worker-profile.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink]
})
export class WorkerProfile implements OnInit {
  workerId: number = 0;

  worker: Worker = {
    id: 0,
    firstName: '',
    lastName: '',
    photo: '',
    dateOfBirth: '',
    aboutYou: '',
    email: '',
    location: { id: 0, name: '' },
    professions: [],
    education: { id: 0, education: '' },
    experience: { id: 0, experience: '' },
    jobTypes: [],
    skills: [],
    compensation: { id: 0, compensation: '' },
    availability: { id: 0, availability: '' }
  };

  constructor(private workerService: WorkerProfileService,
              private authService:AuthService) {}

  ngOnInit(): void {
    const workerId = this.authService.getUser()?.id;
    if (!workerId) return;

    this.workerService.getWorkerById(workerId).subscribe({
      next: (w) => {
        this.worker = {
          ...w,
          professions: w.professions || [],
          skills: w.skills || [],
          jobTypes: w.jobTypes || []
        };
      },
      error: (err) => console.error('Failed to load worker', err)
    });
  }

  loadWorker(): void {
    this.workerService.getWorkerById(this.workerId).subscribe({
      next: (w) => {
        this.worker = {
          ...w,
          professions: w.professions || [],
          skills: w.skills || [],
          jobTypes: w.jobTypes || []
        };
      },
      error: (err) => console.error('Failed to load worker', err)
    });
  }
}
