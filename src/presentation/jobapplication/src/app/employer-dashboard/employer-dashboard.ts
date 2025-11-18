import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './employer-dashboard.html',
  styleUrl: './employer-dashboard.css',
})
export class EmployerDashboard {
   status: 'pending' | 'accepted' | 'rejected' = 'pending';
}
