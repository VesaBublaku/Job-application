import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {NgForOf} from '@angular/common';
import {JobApplication} from '../job-application/job-application';
import {JobApplicationService} from '../job-application/job-application.service';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, NgForOf],
  templateUrl: './employer-dashboard.html',
  styleUrl: './employer-dashboard.css',
})
export class EmployerDashboard implements OnInit{

  applications: JobApplication[] = [];

  constructor(private applicationService: JobApplicationService) {}

  ngOnInit() {
    const employerId = Number(localStorage.getItem("employerId"));

    if (!employerId) {
      console.error("Employer not logged in.");
      return;
    }

    this.applicationService.getEmployerApplications(employerId).subscribe({
      next: apps => this.applications = apps,
      error: err => console.error("Failed to load employer applications:", err)
    });
  }

  updateStatus(appId: number | undefined, status: string | undefined) {
    if (!appId || !status) {
      console.error("Missing id or status!");
      return;
    }

    this.applicationService.updateStatus(appId, status).subscribe({
      next: () => console.log("Status updated!"),
      error: (err) => console.error("Update error:", err)
    });
  }
}
