import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer";
import {HeaderComponent} from "../header/header";
import {RouterLink} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-edit-employer-profile',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './edit-employer-profile.html',
  styleUrl: './edit-employer-profile.css',
})
export class EditEmployerProfile {

}
