import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './worker-dashboard.html',
  styleUrl: './worker-dashboard.css',
})
export class WorkerDashboard {
  status: 'pending' | 'accepted' | 'rejected' = 'pending';
}
