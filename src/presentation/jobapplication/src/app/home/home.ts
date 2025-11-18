import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}
