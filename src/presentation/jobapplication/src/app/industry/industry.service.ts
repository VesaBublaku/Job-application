import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Industry {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  private base = 'http://localhost:8080/industry/all';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Industry[]> {
    return this.http.get<Industry[]>(this.base);
  }
}
