import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profession {
  id: number;
  profession: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  private apiUrl = 'http://localhost:8080/profession/all';

  constructor(private http: HttpClient) {}

  getProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>(this.apiUrl);
  }
}
