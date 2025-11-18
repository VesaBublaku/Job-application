import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NumberOfEmployees {
  id: number;
  numberOfEmployees: string;
}

@Injectable({
  providedIn: 'root'
})
export class NumberOfEmployeesService {

  private base = 'http://localhost:8080/numberOfEmployees/all';

  constructor(private http: HttpClient) {}

  getAll(): Observable<NumberOfEmployees[]> {
    return this.http.get<NumberOfEmployees[]>(this.base);
  }
}
