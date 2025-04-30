import { TestBed } from '@angular/core/testing';

import { FlagBasedPreloadingService } from './flag-based-preloading.service';

describe('FlagBasedPreloadingService', () => {
  let service: FlagBasedPreloadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagBasedPreloadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
