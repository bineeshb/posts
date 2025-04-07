import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { AppService } from 'app/app.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private readonly requests: HttpRequest<any>[] = [];

  constructor(private readonly appService: AppService) {}

  private removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.appService.toggleLoader(this.requests.length > 0);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requests.push(request);
    this.appService.showLoader();

    return next.handle(request).pipe(tap({
      next: res => {
        if (res instanceof HttpResponse) {
          this.removeRequest(request);
        }
      },
      error: () => {
        this.removeRequest(request);
      }
    }));
  }
}
