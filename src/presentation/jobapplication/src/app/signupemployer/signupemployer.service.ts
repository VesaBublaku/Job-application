import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployerDTO {
  companyName: string;
  yearOfFounding: string;
  aboutCompany: string;
  email: string;
  password: string;
  locationId: number | null;
  numberOfEmployeesId: number | null;
  industryId: number | null;
  employerTypeId: number | null;
  experienceId: number | null,
  availabilityId: number | null,
  compensationId: number | null
}

@Injectable({
  providedIn: 'root'
})
export class SignupEmployerService {

  private base = 'http://localhost:8080/employers';

  constructor(private http: HttpClient) {}

  addEmployer(formData: FormData): Observable<any> {
    return this.http.post(`${this.base}/add`, formData);
  }

  getEmployerById(id: number): Observable<any> {
    return this.http.get(`${this.base}/find/${id}`);
  }
}
