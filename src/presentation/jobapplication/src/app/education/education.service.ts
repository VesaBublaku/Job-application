import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Education {
  id: number;
  education: string;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = 'http://localhost:8080/education/all';

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }
}
