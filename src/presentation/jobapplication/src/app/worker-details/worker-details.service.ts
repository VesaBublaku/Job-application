import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Location { id: number; name: string; }
export interface Education { id: number; education: string; }
export interface Experience { id: number; experience: string; }
export interface Compensation { id: number; compensation: string; }
export interface Availability { id: number; availability: string; }
export interface Profession { id: number; profession: string; }
export interface Skill { id: number; skill: string; }
export interface JobType { id: number; jobType: string; }

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  photo?: string;
  dateOfBirth?: string;
  aboutYou?: string;
  email: string;
  location: Location;
  education: Education;
  experience: Experience;
  compensation: Compensation;
  availability: Availability;
  professions: Profession[];
  skills: Skill[];
  jobTypes: JobType[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkerDetailsService {

  private apiUrl = 'http://localhost:8080'; // adresa e backend-it

  constructor(private http: HttpClient) {}

  getWorkerById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiUrl}/worker/find/${id}`);
  }
}
