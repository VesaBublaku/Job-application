import { Component, OnInit } from '@angular/core';
import { WorkerDetailsService, Worker } from './worker-details.service';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-worker-details',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './worker-details.html',
  styleUrls: ['./worker-details.css'],
})
export class WorkerDetails implements OnInit {

  worker?: Worker;

  constructor(
    private workerService: WorkerDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workerService.getWorkerById(id).subscribe({
      next: data => this.worker = data,
      error: err => console.error('Error fetching worker:', err)
    });
  }
}
