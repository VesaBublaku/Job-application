import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer";
import {HeaderComponent} from "../header/header";
import {RouterLink} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-employer-profile',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './employer-profile.html',
  styleUrl: './employer-profile.css',
})
export class EmployerProfile {

}
