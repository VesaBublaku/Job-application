import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployerType {
  id: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployerTypeService {

  private base = 'http://localhost:8080/employerType/all';
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployerType[]> {
    return this.http.get<EmployerType[]>(this.base);
  }
}
