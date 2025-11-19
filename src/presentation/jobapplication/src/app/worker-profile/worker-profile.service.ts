import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location { id: number; name: string; }
export interface Education { id: number; education: string; }
export interface Experience { id: number; experience: string; }
export interface Compensation { id: number; compensation: string; }
export interface Availability { id: number; availability: string; }
export interface Profession { id: number; profession: string; }
export interface Skills { id: number; skill: string; }
export interface JobType { id: number; type: string; }

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
    skills: Skills[];
    jobTypes: JobType[];
}

@Injectable({
    providedIn: 'root'
})
export class WorkerProfileService {
    private api = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    getWorkerById(id: number): Observable<Worker> {
        return this.http.get<Worker>(`${this.api}/worker/find/${id}`);
    }
}
