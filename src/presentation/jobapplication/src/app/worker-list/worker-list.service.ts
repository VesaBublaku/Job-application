import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Worker {
  id?: number;
  firstName: string;
  lastName: string;
  photo?: string;
  aboutYou?: string;
  email: string;
  password?: string;
  dateOfBirth?: string;

  location?: any;
  education?: any;
  experience?: any;
  compensation?: any;
  availability?: any;
  professions?: any[];
  jobTypes?: any[];
  skills?: any[];
}

export interface WorkerDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  aboutYou?: string;
  dateOfBirth?: string;

  locationId: number;
  educationId: number;
  experienceId: number;
  compensationId: number;
  availabilityId: number;

  professionIds: number[];
  jobTypeIds: number[];
  skillIds: number[];
}

@Injectable({providedIn: 'root'})
export class WorkerListService {
  private apiBaseUrl = 'http://localhost:8080/worker';

  constructor(private http: HttpClient) {}

  addWorker(dto: WorkerDTO, photo?: File): Observable<any> {
    const formData = new FormData();
    formData.append('worker', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    if (photo instanceof File && photo.size > 0) {
      formData.append('photo', photo);
    }

    return this.http.post(`${this.apiBaseUrl}/add`, formData);
  }

  updateWorker(id: number, dto: WorkerDTO, photo?: File): Observable<any> {
    const formData = new FormData();
    formData.append('worker', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    if (photo instanceof File && photo.size > 0) {
      formData.append('photo', photo);
    }

    return this.http.put(`${this.apiBaseUrl}/update/${id}`, formData);
  }

  findAll(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.apiBaseUrl}/all`);
  }


  findById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiBaseUrl}/find/${id}`);
  }

  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${id}`);
  }

  searchWorkers(filters: any): Observable<Worker[]> {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.append(key, value);
      }
    });

    return this.http.get<Worker[]>(`${this.apiBaseUrl}/search`, { params });
  }
}
