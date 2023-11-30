import { TestBed } from '@angular/core/testing';

import { DragItemService } from './drag-item.service';

describe('DragItemService', () => {
  let service: DragItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
