import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobDetails} from '../job-details/job-details';
import {JobList} from '../job-list/job-list';

export interface JobType {
  id: number;
  jobType: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  private apiUrl = 'http://localhost:8080/jobType/all';

  constructor(private http: HttpClient) {}

  getJobType(): Observable<JobType[]> {
    return this.http.get<JobType[]>(this.apiUrl);
  }
}
