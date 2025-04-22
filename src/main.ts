import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { environment } from './environments/environment';
import { apiErrorInterceptor, loaderInterceptor } from 'app/interceptors';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([loaderInterceptor, apiErrorInterceptor])
    )
  ]
})
  .catch(err => console.error(err));
