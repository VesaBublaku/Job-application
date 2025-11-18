import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header';
import {FooterComponent} from '../footer/footer';
import {RouterLink, RouterLinkActive} from "@angular/router";

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
export class WorkerList {

}
