import { TestBed } from '@angular/core/testing';

import { MarkedCitysService } from './marked-citys.service';

describe('MarkedCitysService', () => {
  let service: MarkedCitysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkedCitysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
