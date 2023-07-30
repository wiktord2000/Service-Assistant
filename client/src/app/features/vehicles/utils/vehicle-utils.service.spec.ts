import { TestBed } from '@angular/core/testing';

import { VehicleUtilsService } from './vehicle-utils.service';

describe('VehicleUtilsService', () => {
  let service: VehicleUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
