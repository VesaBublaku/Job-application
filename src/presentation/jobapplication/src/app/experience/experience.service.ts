import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Experience {
  id: number;
  experience: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:8080/experience/all';

  constructor(private http: HttpClient) {}

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }
}
