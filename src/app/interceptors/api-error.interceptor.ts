import { inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpContextToken, HttpContext, HttpResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';

import { AppService } from 'app/app.service';

export const DEFAULT_ERROR_MESSAGE = new HttpContextToken(() => 'Error while making a request');
export const IGNORE_STATUSES = new HttpContextToken<number[]>(() => []);
export const SHOW_APP_ERROR_TOAST = new HttpContextToken(() => true);

export const getAPIContext = (defaultErrorMessage: string, showAppErrorToast?: boolean, ignoreStatuses?: number[]): HttpContext => {
  const apiContext = new HttpContext().set(DEFAULT_ERROR_MESSAGE, defaultErrorMessage);

  if (Array.isArray(ignoreStatuses) && ignoreStatuses.length) {
    apiContext.set(IGNORE_STATUSES, ignoreStatuses);
  }

  if (showAppErrorToast !== null && showAppErrorToast !== undefined) {
    apiContext.set(SHOW_APP_ERROR_TOAST, showAppErrorToast);
  }

  return apiContext;
};

let requestCount = 0;

const reduceRequestCount = () => {
  requestCount = requestCount > 0 ? (requestCount - 1) : 0;
};

const getErrorMessage = (error: HttpErrorResponse, request: HttpRequest<unknown>): string => {
  if (!error) {
    return request.context.get(DEFAULT_ERROR_MESSAGE);
  } else if (error.error?.message && typeof error.error.message === 'string') {
    return error.error.message;
  }

  return error.statusText;
};

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const appService = inject(AppService);
  const router = inject(Router);
  const ignoreStatuses = request.context.get(IGNORE_STATUSES);
  requestCount += 1;

  if (requestCount === 1) {
    appService.clearError();
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error?.status && Array.isArray(ignoreStatuses) && ignoreStatuses.includes(error.status)) {
        return of(new HttpResponse());
      }

      const apiError = new Error(getErrorMessage(error, request));
      apiError.name = 'APIError';

      if (request.context.get(SHOW_APP_ERROR_TOAST)) {
        appService.showError(apiError.message);
      }

      if (error?.status === 401) {
        router.navigate(['/login']);
      }

      reduceRequestCount();
      return throwError(() => apiError);
    }),
    tap(() => reduceRequestCount())
  );
};
