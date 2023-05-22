import { TestBed } from '@angular/core/testing';

import { TableHelpersService } from './table-helpers.service';

describe('TableHelpersService', () => {
  let service: TableHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
