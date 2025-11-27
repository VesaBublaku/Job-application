import {Component, isStandalone, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {CommonModule, NgForOf} from '@angular/common';
import {JobApplicationService} from '../job-application/job-application.service';
import {JobListService} from '../job-list/job-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-job-details',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit{

  job: any;
  constructor(
    private applicationService: JobApplicationService,
    private activatedRoute: ActivatedRoute,
    private jobService: JobListService ) {}

  ngOnInit(): void {
    const jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("JOB ID =", jobId); this.loadJob(jobId);
  }

  applyNow() {
    if(!this.job) {
      alert("Job not loaded yet");
      return;
    }
    const workerId = Number(localStorage.getItem("workerId"));

    if(!workerId) {
      alert("You must be logged in as a worker to apply!");
      return;
    }

    const employerId = this.job.id;
    const jobId = this.job.id;

    this.applicationService.apply(workerId, jobId, employerId).subscribe({
      next: () => alert("Application sent successfully!"),
      error: (err) => {
        console.error(err);
        alert("Failed to apply for this job.");
      }
    });
  }

  loadJob(id: number): void {
    this.jobService.findById(id).subscribe({
      next: (res) => {
        this.job = res;
        },
      error: (err) => console.error('Failed to load job', err)
    });
  }

  encode(file: string): string {
    return encodeURIComponent(file);
  }
}
