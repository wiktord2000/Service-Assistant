import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProfileBasketComponent } from './order-profile-basket.component';

describe('OrderProfileBasketComponent', () => {
  let component: OrderProfileBasketComponent;
  let fixture: ComponentFixture<OrderProfileBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProfileBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
