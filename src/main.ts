import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { apiErrorInterceptor, loaderInterceptor } from 'app/interceptors';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideHttpClient(
      withInterceptors([loaderInterceptor, apiErrorInterceptor])
    )
  ]
})
  .catch(err => console.error(err));
