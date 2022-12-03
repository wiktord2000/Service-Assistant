import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServicesTableComponent } from './order-services-table.component';

describe('OrderServicesTableComponent', () => {
  let component: OrderServicesTableComponent;
  let fixture: ComponentFixture<OrderServicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderServicesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
