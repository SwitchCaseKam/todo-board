import { TestBed } from '@angular/core/testing';

import { TasksViewService } from './tasks-view.service';

describe('TasksViewService', () => {
  let service: TasksViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
