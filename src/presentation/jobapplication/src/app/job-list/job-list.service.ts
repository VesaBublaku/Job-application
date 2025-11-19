import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Employer} from './job';

@Injectable({providedIn: 'root'})
export class JobListService {
  private apibaseUrl = 'http://localhost:8080/employers';

  constructor(private http : HttpClient) {}

  addJob(dto: any, logo?: File): Observable<any> {
    const formData = new FormData();
    formData.append("employer", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (logo instanceof File && logo.size > 0) {
      formData.append("logo", logo);
    }

    return this.http.post<Employer>(`${this.apibaseUrl}/add`, formData);
  }

  findAll(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.apibaseUrl}/all`);
  }

  findById(id: number): Observable<Employer> {
    return this.http.get<Employer>(`${this.apibaseUrl}/find/${id}`);
  }

  updateJob(id: number, dto: any, logo?: File): Observable<any> {
    const formData = new FormData();
    formData.append("employer", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (logo instanceof File && logo.size > 0) {
      formData.append("logo", logo);
    }

    return this.http.put<Employer>(`${this.apibaseUrl}/update/${id}`, formData);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apibaseUrl}/delete/${id}`);
  }
}
