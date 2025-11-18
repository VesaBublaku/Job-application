import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Availability {
  id: number;
  availability: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:8080/availability/all';

  constructor(private http: HttpClient) {}

  getAvailability(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.apiUrl);
  }
}
