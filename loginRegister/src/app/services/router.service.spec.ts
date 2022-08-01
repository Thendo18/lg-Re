import { TestBed } from '@angular/core/testing';

import { RouterService } from 'src/app/services/router.service';

describe('RouterService', () => {
  let service: RouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
