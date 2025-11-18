import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  standalone: true,
  selector: 'app-worker-details',
  imports: [
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './worker-details.html',
  styleUrl: './worker-details.css',
})
export class WorkerDetails {

}
