import { TestBed } from '@angular/core/testing';

import { TaskSelectService } from './task-select.service';

describe('TaskSelectService', () => {
  let service: TaskSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
