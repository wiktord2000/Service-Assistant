import { TestBed } from '@angular/core/testing';

import { SelectInputService } from './select-input.service';

describe('SelectInputService', () => {
  let service: SelectInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
