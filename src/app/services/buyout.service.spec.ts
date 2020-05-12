import { TestBed } from '@angular/core/testing';

import { BuyoutService } from './buyout.service';

describe('BuyoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyoutService = TestBed.get(BuyoutService);
    expect(service).toBeTruthy();
  });
});
