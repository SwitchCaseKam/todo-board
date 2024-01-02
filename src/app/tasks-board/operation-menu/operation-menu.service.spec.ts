import { TestBed } from '@angular/core/testing';

import { OperationMenuService } from './operation-menu.service';

describe('OperationMenuService', () => {
  let service: OperationMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
