import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WorkerDTO {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email: string;
  password: string;
  aboutYou?: string;
  locationId?: number | null;
  educationId?: number | null;
  experienceId?: number | null;
  compensationId?: number | null;
  availabilityId?: number | null;
  professionIds?: number[];
  jobTypeIds?: number[];
  skillIds?: number[];
}

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  email: string;
  aboutYou?: string;
  photo?: string;
  location?: any;
  education?: any;
  experience?: any;
  compensation?: any;
  availability?: any;
  professions?: any[];
  jobTypes?: any[];
  skills?: any[];
}

@Injectable({ providedIn: 'root' })
export class SignupService {
  private apiUrl = 'http://localhost:8080/worker';

  constructor(private http: HttpClient) {}

  addWorker(formData:FormData): Observable<Worker> {
    return this.http.post<Worker>(`${this.apiUrl}/add`, formData);
  }

  getWorkerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/find/${id}`);
  }
}
