import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerListService {

  private apiUrl = 'http://localhost:8080/worker';

  constructor(private http: HttpClient) { }

  // Get all workers
  getAllWorkers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Get worker by ID
  getWorkerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }

  //(Opsionale) Filter workers
  filterWorkers(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params });
  }
}

