import { TestBed } from '@angular/core/testing';

import { APIErrorInterceptor } from './api-error.interceptor';

describe('APIErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      APIErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: APIErrorInterceptor = TestBed.inject(APIErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
