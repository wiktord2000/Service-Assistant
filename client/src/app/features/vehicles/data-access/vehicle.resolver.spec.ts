import { TestBed } from '@angular/core/testing';

import { VehicleResolver } from './vehicle.resolver';

describe('VehicleResolver', () => {
  let resolver: VehicleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VehicleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
