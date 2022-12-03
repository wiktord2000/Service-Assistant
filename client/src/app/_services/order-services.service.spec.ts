import { TestBed } from '@angular/core/testing';

import { OrderServicesService } from './order-services.service';

describe('OrderServicesService', () => {
  let service: OrderServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
