import { TestBed } from '@angular/core/testing';

import { HistoryItemService } from './history-item.service';



describe('HistoryItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryItemService = TestBed.get(HistoryItemService);
    expect(service).toBeTruthy();
  });
});
