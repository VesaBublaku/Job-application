import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {JobListService} from '../job-list/job-list.service';
import {WorkerListService} from '../worker-list/worker-list.service';
import {Employer} from '../job-list/job';
import {Worker} from '../worker-list/worker';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit{
  recentJobs: Employer[] = [];
  highlightedWorkers: Worker[] = [];

  constructor(private jobService: JobListService, private workerService: WorkerListService ) {}

  ngOnInit() {
    this.loadRecentJobs();
    this.loadHighlightedWorkers();
  }

  loadRecentJobs() {
    this.jobService.getRecentJobs().subscribe({
      next: res => this.recentJobs = res,
      error: err => console.error(err)
    });
  }

  loadHighlightedWorkers() {
    this.workerService.getHighlightedWorkers().subscribe({
      next: res => this.highlightedWorkers = res,
      error: err => console.error(err)
    });
  }
}
