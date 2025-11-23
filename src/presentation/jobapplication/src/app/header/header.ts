import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.loggedIn$.subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  userPhotoUrl(): string {
    const user = this.authService.getUser();
    if (!user) return 'http://localhost:8080/uploads/default-avatar.jpg';

    const photo = user.photo || user.companyLogo;

    return photo
      ? `http://localhost:8080/uploads/${encodeURIComponent(photo)}`
      : 'http://localhost:8080/uploads/default-avatar.jpg';
  }

  goToProfile() {
    const user = this.authService.getUser();
    if (!user) return;
    if (user.role === 'worker') this.router.navigate(['/worker-profile']);
    else if (user.role === 'employer') this.router.navigate(['/employer-profile']);
  }

  logout() {
    this.authService.clearUser();
    localStorage.removeItem('workerId');
    localStorage.removeItem('employerId');
    this.router.navigate(['/login']);
  }

}
