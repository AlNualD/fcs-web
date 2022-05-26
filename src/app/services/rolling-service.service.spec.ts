import { TestBed } from '@angular/core/testing';

import { RollingServiceService } from './rolling-service.service';

describe('RollingServiceService', () => {
  let service: RollingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
