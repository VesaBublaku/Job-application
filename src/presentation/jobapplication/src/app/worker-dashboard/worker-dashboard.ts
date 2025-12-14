import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {NgForOf, NgIf} from '@angular/common';
import {JobApplicationService} from '../job-application/job-application.service';
import {JobApplication} from '../job-application/job-application';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, NgForOf, NgIf],
  templateUrl: './worker-dashboard.html',
  styleUrl: './worker-dashboard.css',
})
export class WorkerDashboard implements OnInit{

  applications: JobApplication[] = [];

  constructor(private applicationService: JobApplicationService) {}

  ngOnInit() {
    const workerId = Number(localStorage.getItem("workerId"));

    if (!workerId) {
      console.error("Worker not logged in.");
      return;
    }

    this.applicationService.getWorkerApplications(workerId).subscribe({
      next: (apps) => {
        this.applications = apps;
      },
      error: (err) => {
        console.error("Failed to load worker applications:", err);
      }
    });
  }
}
