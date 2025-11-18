import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-edit-worker-profile',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './edit-worker-profile.html',
  styleUrl: './edit-worker-profile.css',
})
export class EditWorkerProfile {

}
