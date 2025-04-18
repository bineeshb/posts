import { inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

import { AppService } from 'app/app.service';

const requests: HttpRequest<any>[] = [];

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const appService = inject(AppService);
  const removeRequest = (): void => {
    const i = requests.indexOf(request);

    if (i >= 0) {
      requests.splice(i, 1);
    }

    appService.toggleLoader(requests.length > 0);
  };

  requests.push(request);
  appService.showLoader();

  return next(request).pipe(
    tap({
      next: res => {
        if (res instanceof HttpResponse) {
          removeRequest();
        }
      },
      error: () => {
        removeRequest();
      }
    })
  );
};
