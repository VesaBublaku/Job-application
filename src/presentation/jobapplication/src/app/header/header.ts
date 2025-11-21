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
    // Set initial state
    this.loggedIn = this.authService.isLoggedIn();

    // Subscribe to login/logout changes
    this.authService.loggedIn$.subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  userPhotoUrl(): string {
    const user = this.authService.getUser();
    return user?.photo ? `http://localhost:8080/uploads/${user.photo}` : 'assets/default-avatar.png';
  }

  goToProfile() {
    const user = this.authService.getUser();
    if (!user) return; // safety check
    if (user.role === 'worker') this.router.navigate(['/worker-profile']);
    else if (user.role === 'employer') this.router.navigate(['/employer-profile']);
  }

  logout() {
    this.authService.clearUser(); // clears localStorage and updates loggedIn$
    this.router.navigate(['/login']); // redirect to login page
  }

}
