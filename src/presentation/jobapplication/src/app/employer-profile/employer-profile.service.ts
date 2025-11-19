import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employer} from '../job-list/job';


@Injectable({
  providedIn: 'root'
})
export class EmployerProfileService {
  private baseUrl = 'http://localhost:8080/employers';

  constructor(private http: HttpClient) {}

  getEmployerById(id: number): Observable<Employer> {
    return this.http.get<Employer>(`${this.baseUrl}/find/${id}`);
  }
}
