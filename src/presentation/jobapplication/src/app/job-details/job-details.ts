import {Component, isStandalone, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {NgForOf} from '@angular/common';
import {JobApplicationService} from '../job-application/job-application.service';

@Component({
  standalone:true,
  selector: 'app-job-details',
  imports: [HeaderComponent, FooterComponent, NgForOf],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails{

  constructor(private applicationService: JobApplicationService) {}


  applyNow() {
    const workerId = 1;
    const jobId = 1;
    const employerId = 26;

    this.applicationService.apply(workerId, jobId, employerId).subscribe({
      next: () => {
        alert("Application sent successfully!");
      },
      error: (err) => {
        console.error("Apply error:", err);
        alert("Failed to apply for this job.");
      }
    })
  }
}
