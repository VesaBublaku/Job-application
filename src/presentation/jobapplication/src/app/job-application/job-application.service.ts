import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobApplication} from './job-application';

@Injectable({providedIn: 'root'})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8080/application';

  constructor(private http: HttpClient) {}

  apply(workerId: number, jobId: number, employerId: number): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.baseUrl}/apply?workerId=${workerId}&jobId=${jobId}&employerId=${employerId}`, {});
  }

  getWorkerApplications(workerId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/worker/${workerId}`);
  }

  getEmployerApplications(employerId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/employer/${employerId}`);
  }

  updateStatus(id: number, status: string): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }
}
