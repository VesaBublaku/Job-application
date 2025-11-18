import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  standalone:true,
  selector: 'app-job-list',
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {

}
