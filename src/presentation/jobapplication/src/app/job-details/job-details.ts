import {Component, isStandalone} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  standalone:true,
  selector: 'app-job-details',
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {

}
