import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {

}
