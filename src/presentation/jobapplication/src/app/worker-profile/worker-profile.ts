import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkerDTO, WorkerProfileService, Worker as WorkerModel } from './worker-profile.service';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'app-workerprofile',
  templateUrl: './worker-profile.html',
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./worker-profile.css']
})
export class WorkerProfile implements OnInit {

  worker!: WorkerModel;
  selectedPhoto: File | null = null;
  workerId = 0;

  constructor(private workerService: WorkerProfileService) {}

  ngOnInit() {
    this.loadWorker();
  }

  loadWorker() {
    this.workerService.getWorkerById(this.workerId).subscribe(w => this.worker = w);
  }

  onPhotoSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  saveChanges(form: NgForm) {
    const workerDTO: WorkerDTO = {
      firstName: form.value.first,
      lastName: form.value.last,
      dateOfBirth: form.value.dob,
      email: form.value.email,
      aboutYou: form.value.about,
      password: form.value.password,
      locationId: form.value.location,
      educationId: form.value.education,
      experienceId: form.value.experience,
      compensationId: form.value.compensation,
      availabilityId: form.value.availability,
      professionIds: [form.value.profession],
      jobTypeIds: [form.value.jobtype],
      skillIds: [form.value.skills]
    };

    this.workerService.updateWorker(this.workerId, workerDTO, this.selectedPhoto ?? undefined)
      .subscribe(res => {
        alert('Profile updated successfully!');
        this.loadWorker();
      });
  }

  deleteWorker() {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.workerService.deleteWorker(this.workerId).subscribe(() => {
        alert('Worker deleted');
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm, CommonModule } from '@angular/forms'; // CommonModule duhet per *ngFor dhe *ngIf
import { WorkerDTO, WorkerProfileService, Worker as WorkerModel } from './worker-profile.service';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'app-workerprofile',
  templateUrl: './worker-profile.html',
  // Shto CommonModule ne imports per te perdorur *ngFor, *ngIf
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  styleUrls: ['./worker-profile.css']
})
export class WorkerProfile implements OnInit {

  worker!: WorkerModel;
  selectedPhoto: File | null = null;
  // Kjo duhet te zevendesohet me ID e punetorit aktual
  workerId = 1; 

  constructor(private workerService: WorkerProfileService) {}

  ngOnInit() {
    this.loadWorker();
  }

  loadWorker() {
    this.workerService.getWorkerById(this.workerId).subscribe(w => this.worker = w);
  }

  onPhotoSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  saveChanges(form: NgForm) {
    const workerDTO: WorkerDTO = {
      firstName: form.value.first,
      lastName: form.value.last,
      dateOfBirth: form.value.dob,
      email: form.value.email,
      aboutYou: form.value.about,
      password: form.value.password,
      locationId: form.value.location,
      educationId: form.value.education,
      experienceId: form.value.experience,
      compensationId: form.value.compensation,
      availabilityId: form.value.availability,
      professionIds: [form.value.profession],
      jobTypeIds: [form.value.jobtype],
      skillIds: [form.value.skills]
    };

    this.workerService.updateWorker(this.workerId, workerDTO, this.selectedPhoto ?? undefined)
      .subscribe(res => {
        alert('Profile updated successfully!');
        this.loadWorker();
      });
  }

  deleteWorker() {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.workerService.deleteWorker(this.workerId).subscribe(() => {
        alert('Worker deleted');
      });
    }
  }
}