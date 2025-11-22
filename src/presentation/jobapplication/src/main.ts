import { bootstrapApplication } from '@angular/platform-browser';
import {AppComponent} from './app/app';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app/app.routes';

import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    importProvidersFrom(HttpClientModule)
    ]
}).catch(err => console.error(err));

