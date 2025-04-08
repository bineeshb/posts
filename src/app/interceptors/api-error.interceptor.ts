import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken,
  HttpContext,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

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

@Injectable()
export class APIErrorInterceptor implements HttpInterceptor {
  private requestCount = 0;

  constructor(
    private readonly appService: AppService,
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const ignoreStatuses = request.context.get(IGNORE_STATUSES);
    this.requestCount += 1;

    if (this.requestCount === 1) {
      this.appService.clearError();
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status && Array.isArray(ignoreStatuses) && ignoreStatuses.includes(error.status)) {
          return of(new HttpResponse());
        }

        const apiError = new Error(this.getErrorMessage(error, request));
        apiError.name = 'APIError';

        if (request.context.get(SHOW_APP_ERROR_TOAST)) {
          this.appService.showError(apiError.message);
        }

        if (error?.status === 401) {
          this.router.navigate(['/login']);
        }

        this.reduceRequestCount();
        return throwError(() => apiError);
      }),
      tap(() => this.reduceRequestCount())
    );
  }

  private reduceRequestCount(): void {
    this.requestCount = this.requestCount > 0 ? (this.requestCount - 1) : 0;
  }

  private getErrorMessage(error: HttpErrorResponse, request: HttpRequest<unknown>): string {
    if (!error) {
      return request.context.get(DEFAULT_ERROR_MESSAGE);
    } else if (error.error?.message && typeof error.error.message === 'string') {
      return error.error.message;
    }

    return error.statusText;
  }
}
