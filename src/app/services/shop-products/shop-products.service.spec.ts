import { TestBed } from '@angular/core/testing';

import { ShopProductsService } from './shop-products.service';

describe('ShopProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopProductsService = TestBed.get(ShopProductsService);
    expect(service).toBeTruthy();
  });
});
