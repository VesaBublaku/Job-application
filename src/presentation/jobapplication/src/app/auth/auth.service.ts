import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  loggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  clearUser() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
