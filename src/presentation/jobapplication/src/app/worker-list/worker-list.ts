import { Component, OnInit } from '@angular/core';
import { WorkerListService } from './worker-list.service';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-worker-list',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './worker-list.html',
  styleUrl: './worker-list.css',
})
export class WorkerList implements OnInit {

  workers: any[] = [];

  constructor(private service: WorkerListService) {}

  ngOnInit() {
    this.service.getAllWorkers().subscribe(data => {
      this.workers = data;
    });
  }
}
