import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { apiErrorInterceptor, loaderInterceptor } from 'app/interceptors';
import { appRoutes } from './app.routes';
import { FlagBasedPreloadingService } from './services';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(
      appRoutes,
      withPreloading(FlagBasedPreloadingService),
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([loaderInterceptor, apiErrorInterceptor])
    )
  ]
};
