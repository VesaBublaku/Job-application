import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compensation {
  id: number;
  compensation: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompensationService {
  private apiUrl = 'http://localhost:8080/compensation/all';

  constructor(private http: HttpClient) {}
  getCompensation(): Observable<Compensation[]> {
    return this.http.get<Compensation[]>(this.apiUrl);
  }
}
