import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {JobListService} from './job-list.service';
import {CommonModule} from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-job-list',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit{

  jobs: any[] = [];

  constructor(private jobListService: JobListService) {}

  ngOnInit() {
    this.jobListService.findAll().subscribe({
      next: (data) => {
        console.log("Loaded jobs:", data);
        this.jobs = data;
      },
      error: (err) => console.error('Error loading jobs:', err)
    });
  }

  encode(filename: string): string {
    return encodeURIComponent(filename);
  }
}
